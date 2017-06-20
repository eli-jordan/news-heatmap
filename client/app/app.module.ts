import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {AppComponent} from "./app.component";
import {NguiMapModule} from "@ngui/map";
import {HeatmapComponent} from "./heatmap/heatmap.component";
import {NewsSentimentService} from "./heatmap/news.sentiment.service";
import {MdCardModule, MdGridListModule} from "@angular/material";
import {Routes, RouterModule} from "@angular/router";

const AppRoutes: Routes = [
    { path: '', component: HeatmapComponent },
];


@NgModule({
    declarations: [
        AppComponent,
        HeatmapComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        NguiMapModule.forRoot({
            apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyCk48pwkJEVBu-fRQsuuBuU72DX_U4ogMU&libraries=visualization'
        }),
        RouterModule.forRoot(AppRoutes),
        MdCardModule,
        MdGridListModule
    ],
    providers: [
        NewsSentimentService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
