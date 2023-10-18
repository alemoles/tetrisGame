import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from 'src/environments/environments';
import { Score } from '../interfaces/score.interface';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ScoresService implements OnInit {

    private baseUrl: string = environments.baseUrl;
    private _scores: Score[] = [];

    constructor(private httpClient: HttpClient) { }

    ngOnInit(): void {
        this.loadScores();
    }

    private loadScores(): void {
        this.getScores()
            .pipe(
                tap(scores => {
                    console.log(scores);
                })
            )
            .subscribe(scores => {  
                this._scores = scores.sort((a, b) => b.score - a.score).slice(0, 10);
                console.log(this._scores);
            });
    }

    public getScores(): Observable<Score[]> {
        const url = `${this.baseUrl}/scores`;
        return this.httpClient.get<Score[]>(url);
    }

    public addScore(score: number, name: string): Observable<Score> {
        const newScore = {
            "username": name,
            "score": score
        }
        return this.httpClient.post<Score>(`${this.baseUrl}/scores`, newScore);
    }

    public canAddScore(score: number): boolean {
        if (score === 0 || score < this.lowestScore) {
            return false;
        }
        return true;
    }

    public updateScores() {
        this.loadScores();
    }

    get scores(): Score[] {
        return [...this._scores];
    }

    get lowestScore(): number {
        return this._scores.length ? this._scores[this._scores.length - 1].score : 0;
    }
}