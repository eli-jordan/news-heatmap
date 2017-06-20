import {Component, OnInit, ViewChild, Input} from "@angular/core";
import {HeatmapLayer} from "@ngui/map";
import {Observable, Subject} from "rxjs";
import {NewsSentimentService} from "./news.sentiment.service";
import WeightedLocation = google.maps.visualization.WeightedLocation;

@Component({
    template: `
<ngui-map
        zoom="1"
        minZoom="1"
        center="0, 0"
        mapTypeId="satellite"
        style="height: 400px; width: 600px;">

    <heatmap-layer [data]="points" dissipating="false"></heatmap-layer>
</ngui-map>
`,
    selector: 'app-heatmap',
    styles: []
})
export class HeatmapComponent implements OnInit {

    @Input()
    itemId: string;

    @ViewChild(HeatmapLayer) heatmapLayer: HeatmapLayer;
    heatmap: google.maps.visualization.HeatmapLayer;

    points = [];

    constructor(private sentiment: NewsSentimentService) {}

    ngOnInit() {
        this.heatmapLayer['initialized$'].subscribe(heatmap => {
            console.log("Initialized CB...", heatmap);

            this.heatmap = heatmap;

            this.dataToPoints().subscribe(point => {
                this.points.push(point);
                this.heatmap.setData(this.points);
            });
        });
    }

    dataToPoints(): Observable<WeightedLocation> {
        return this.sentiment.fetchContentSentiment(this.itemId).flatMap(item => {
            if (item.location.geo !== "") {
                let components = item.location.geo.split(" ");
                let location = new google.maps.LatLng(parseFloat(components[0]), parseFloat(components[1]));

                return Observable.of({
                    location: location,
                    weight: this.weight(item)
                });
            } else {
                 return this.geocode(item);
            }
        });
    }

    /**
     * Calculates the weight
     * @param item
     * @returns {number}
     */
    weight(item): number {
        let sentiments = item.sources.map(s => s.sentiment).filter(s => s !== undefined);
        let sum = sentiments.reduce((a, b) => a + b);
        let avg = sum / sentiments.length;

        // the sentiment is in the range [-1, 1]
        const oldMax = 1;
        const oldMin = -1;

        // the weight range is [1, 10]
        const newMax = 10;
        const newMin = 1;

        return (newMax - newMin) / (oldMax - oldMin) * (avg - oldMax) + newMax;
    }

    /**
     * Uses the google maps Geocode API to convert a named location into lat/lng coordinates
     * @param item
     * @returns {Observable}
     */
    geocode(item): Observable<WeightedLocation> {
        let subject = new Subject();
        let geocoder = new google.maps.Geocoder();
        geocoder.geocode({address: item.location.name}, (results) => {
            subject.next({
                location: results[0].geometry.location,
                weight: this.weight(item)
            });
        });

        return subject;
    }
}
