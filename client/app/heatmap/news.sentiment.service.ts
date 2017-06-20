
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Observable} from "rxjs";

export type Stage = "authoring" | "delivery";

@Injectable()
export class NewsSentimentService {

    stage = "delivery";

    constructor(private http: Http) {
    }

    fetchContentSentiment(id: string): Observable<any> {
        return this.http.get(`/api/related-to/${id}?stage=${this.stage}`).flatMap(response =>
            Observable.from(response.json() as any[])
        );
    }

    listNewsArticles(): Observable<any[]> {
        return this.http.get(`/api/list-articles?stage=${this.stage}`).map(response => response.json());
    }
}
