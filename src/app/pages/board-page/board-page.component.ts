import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription, fromEvent } from 'rxjs';
import { CONSTANTS, EVENT_MOVEMENTS } from 'src/app/constants';
import { CanComponentDeactivate } from 'src/app/guards/can-deactivate.guard';

interface Position {
  x: number;
  y: number;
}

interface Piece {
  position: Position;
  shape: number[][];
}

// 4. piece
const piece: Piece = {
  position: { x: 5, y: 5 },
  shape: [
    [1, 1],
    [1, 1]
  ]
}

// 9. random pieces
const PIECES = [
  [
    [1, 1],
    [1, 1]
  ],
  [
    [1, 1, 1, 1],
  ],
  [
    [1, 1, 0],
    [0, 1, 1]
  ],
  [
    [1, 1, 0],
    [0, 1, 1]
  ],
  [
    [1, 0],
    [1, 0],
    [1, 1]
  ],
  [
    [0, 1],
    [0, 1],
    [1, 1]
  ],
]



@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.css']
})
export class BoardPageComponent implements AfterViewInit, OnInit, CanComponentDeactivate, OnDestroy {
  @ViewChild('myCanvas', { static: true })
  public canvas: ElementRef<HTMLCanvasElement>;
  private context!: CanvasRenderingContext2D;
  public dropCounter: number = 0;
  public lastTime: number = 0;
  public score: number = 0;
  public board: number[][] = [[]];
  audio = new Audio();

  private subscription: Subscription = new Subscription;

  constructor() {
    this.canvas = {} as ElementRef<HTMLCanvasElement>;
    this.board = this.createBoard(CONSTANTS.BOARD_WIDTH, CONSTANTS.BOARD_HEIGHT);
  }

  ngOnInit() {
    this.playAudio();
    this.subscription = fromEvent(window, 'beforeunload').subscribe(event => {
      if (!this.canDeactivate()) {
        event.preventDefault();
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  canDeactivate(): boolean {
    return window.confirm("Do you really want to leave? Changes may not be saved.");
  }

  playAudio() {
    this.audio.src = 'assets/tetris.mp3';
    this.audio.load();
    this.audio.play();
    this.audio.loop = true;
    this.audio.volume = 0.2;
  }

  ngAfterViewInit(): void {
    const context = this.canvas.nativeElement.getContext('2d');
    if (context !== null) {
      this.context = context;
      this.canvas.nativeElement.width = CONSTANTS.BLOCK_SIZE * CONSTANTS.BOARD_WIDTH;
      this.canvas.nativeElement.height = CONSTANTS.BLOCK_SIZE * CONSTANTS.BOARD_HEIGHT;
      this.context.scale(CONSTANTS.BLOCK_SIZE, CONSTANTS.BLOCK_SIZE);

      requestAnimationFrame(() => this.update());
    } else {
      console.error('2D context not supported');
    }
  }

  createBoard(width: number, height: number): number[][] {
    return Array(height).fill(0).map(() => Array(width).fill(0));
  }

  //2. game loop
  update(time: number = 0): void {
    const deltaTime = time - this.lastTime;
    this.lastTime = time;
    this.dropCounter += deltaTime;
    if (this.dropCounter > 1000) {
      piece.position.y++;
      this.dropCounter = 0;
      if (this.checkCollisions(piece)) {
        piece.position.y--;
        this.solidifyPiece(piece);
        this.removeRows();
      }
    }
    this.draw();
    requestAnimationFrame((time) => this.update(time));
  }

  draw(): void {
    if (this.context) {
      this.context.fillStyle = '#000';
      this.context.fillRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);

      this.board.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value === 1) {
            this.context!.fillStyle = 'yellow'
            this.context!.fillRect(x, y, 1, 1)
          }
        })
      })

      piece.shape.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value) {
            this.context.fillStyle = 'red';
            this.context.fillRect(x + piece.position.x, y + piece.position.y, 1, 1);
          }
        })
      })
    }
  }
  /**
   * 
   * Since the update method is already being 
   * called continuously due to the requestAnimationFrame loop, 
   * you don't need to call this.update() again within the onKeydown method. 
   * Every time piece position changes, the next call to update (and thus draw)
   *  will reflect those changes.
   */
  @HostListener('window:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case EVENT_MOVEMENTS.LEFT:
        piece.position.x--;
        if (this.checkCollisions(piece)) {
          piece.position.x++;
        }
        break;
      case EVENT_MOVEMENTS.RIGHT:
        piece.position.x++;
        if (this.checkCollisions(piece)) {
          piece.position.x--;
        }
        break;
      case EVENT_MOVEMENTS.DOWN:
        piece.position.y++;
        if (this.checkCollisions(piece)) {
          piece.position.y--;
          this.solidifyPiece(piece);
          this.removeRows();
        }
        break;
      // Rotate piece
      case EVENT_MOVEMENTS.UP:
        // todo: improve rotate method to large pieces on the right 
        // side of the board
        const rotated: number[][] = [];
        for (let index = 0; index < piece.shape[0].length; index++) {
          const row: number[] = [];
          for (let j = piece.shape.length - 1; j >= 0; j--) {
            row.push(piece.shape[j][index]);
          }
          rotated.push(row);
        }
        const previousShape = piece.shape;
        piece.shape = rotated;
        if (this.checkCollisions(piece)) {
          piece.shape = previousShape;
        }
        break;
      default:
        break;
    }
  }


  checkCollisions(piece: Piece) {
    return piece.shape.find((row, y) => {
      return row.find((value, x) => {
        return (
          value !== 0 &&
          this.board[y + piece.position.y]?.[x + piece.position.x] !== 0
        )
      })
    })
  }

  solidifyPiece(piece: Piece) {
    piece.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value === 1) {
          this.board[y + piece.position.y][x + piece.position.x] = 1
        }
      })
    })
    // get random shape
    piece.shape = PIECES[Math.floor(Math.random() * PIECES.length)]
    //reset position
    piece.position.x = Math.floor(CONSTANTS.BOARD_WIDTH / 2 - 2)
    piece.position.y = 0

    // gameover
    if (this.checkCollisions(piece)) {
      window.alert('Game over !! Sorry');
      this.board.forEach((row) => row.fill(0));
    }
  }

  removeRows() {
    const rowsToRemove: number[] = []
    this.board.forEach((row, y) => {
      if (row.every(value => value === 1)) {
        rowsToRemove.push(y);
      }
    })

    rowsToRemove.forEach(row => {
      this.board.splice(row, 1)
      const newRow = Array(CONSTANTS.BOARD_WIDTH).fill(0);
      this.board.unshift(newRow);
    })
    if (rowsToRemove.length > 0) {
      this.score += 10;
    }
  }
}
