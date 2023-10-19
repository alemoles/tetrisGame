import { Component, OnDestroy, OnInit } from '@angular/core';
import { Score } from 'src/app/interfaces/score.interface';
import { ScoresService } from 'src/app/services/scores.service';

@Component({
  selector: 'app-score-page',
  templateUrl: './score-page.component.html',
  styleUrls: ['./score-page.component.css']
})
export class ScorePageComponent implements OnInit {
  public scores: Score[] = []

  constructor(private scoresService: ScoresService) { }

  ngOnInit(): void {
    this.scoresService.getScores()
      .subscribe(
        (fetchedScores: Score[]) => {
          this.scores = fetchedScores;
        }
      );
  }

  truncateUsername(username: string): string {
    const maxWords = 2;
    const splitName = username.split(' ');

    if (splitName.length > maxWords) {
      return splitName.slice(0, maxWords).join(' ') + '...';
    }
    return username;
  }

}
