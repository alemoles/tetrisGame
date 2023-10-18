import { Component } from '@angular/core';
import { Score } from 'src/app/interfaces/score.interface';
import { ScoresService } from 'src/app/services/scores.service';

@Component({
  selector: 'app-score-page',
  templateUrl: './score-page.component.html',
  styleUrls: ['./score-page.component.css']
})
export class ScorePageComponent {
  private _scores: Score[] = [];

  constructor(
    private scoresService: ScoresService
  ) {
    this.updateScores()
  }

  public updateScores() {
    this._scores = this.scoresService.scores;
  }

  get scores(): Score[] {
    return this._scores;
  }

}
