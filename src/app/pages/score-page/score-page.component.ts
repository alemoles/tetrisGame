import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Score } from 'src/app/interfaces/score.interface';
import { ScoresService } from 'src/app/services/scores.service';

@Component({
  selector: 'app-score-page',
  templateUrl: './score-page.component.html',
  styleUrls: ['./score-page.component.css']
})
export class ScorePageComponent implements OnInit {

  constructor(
    private scoresService: ScoresService,
    private router: Router,
  ) { }


  ngOnInit() {
    this.scoresService.loadScores();
  }

  get scores(): Score[] {
    return this.scoresService.scores;
  }

  public reset(): void {
    const navigationExtras: NavigationExtras = {
      replaceUrl: true
    };
    this.router.navigate(['/board'], navigationExtras);
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
