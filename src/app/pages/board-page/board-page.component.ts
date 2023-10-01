import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.css']
})
export class BoardPageComponent implements AfterViewInit {
  @ViewChild('myCanvas', { static: true })
  public canvas: ElementRef<HTMLCanvasElement>;
  private context?: CanvasRenderingContext2D;

  constructor() {
    this.canvas = {} as ElementRef<HTMLCanvasElement>;    
  }

  ngAfterViewInit(): void {
    const context = this.canvas.nativeElement.getContext('2d');
    if (context !== null) {
        this.context = context;
        this.draw();
    } else {
        console.error('2D context not supported');
    }
  }

  draw(): void {
    if (this.context) {
      // Your drawing code here
      this.context.fillStyle = 'red';
      this.context.fillRect(0, 0, 200, 200);
    }
  }
}
