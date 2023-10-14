import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from 'src/environments/environments';
import { Score } from '../interfaces/score.interface';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ScoresService {
    private baseUrl: string = environments.baseUrl;
    constructor(private httpClient: HttpClient) { }

    getScores(): Observable<Score[]> {
        return this.httpClient.get<Score[]>(`${this.baseUrl}/scores`);
    }

    addScore(score: Score): Observable<Score> {
        return this.httpClient.post<Score>(`${this.baseUrl}/scores`, score);
    }
}