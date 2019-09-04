export default class Game {
  // static points = {
  //   '1': 40,
  //   '2': 100,
  //   '3': 300,
  //   '4': 1200,
  // };

  constructor(options) {
    this.width = options.width;
    this.columns = options.columns;
    this.rows = options.rows;
    this.coastWidth = options.coastWidth;
    this.reset();
  }

  reset() {
  //   this.score = 0;
  //   this.lines = 0;
  //   this.topOut = false;
    this.playfield = this.createPlayfield();
    this.hero = this.createHero();
  }

  // get level() {
  //   return Math.floor(this.lines * 0.1);
  // }

  getState() {
    const playfield = this.playfield.slice().map(x => x.slice());
    const { x, y, bodyColor } = this.hero;

    playfield[y][x] = bodyColor;

    return  {
  //     score: this.score,
  //     level: this.level,
  //     lines: this.lines,
      // isGameOver: this.topOut,
      isGameOver: false, //temp
  //     nextPiece: this.nextPiece,
      playfield: playfield
    }
  }

  createPlayfield() {
    return Array(this.rows).fill(0).map((line, index) => {
      if (index < this.coastWidth || index >= this.rows - this.coastWidth) return Array(this.columns).fill(3);
      return Array(this.coastWidth).fill(3)
              .concat(Array(this.columns - this.coastWidth * 2).fill(0)
              .concat(Array(this.coastWidth).fill(3)));
      }
    );
  }

  createHero() {
    return {
      x: this.columns / 2,
      y: 0,
      bodyColor: 7,
      borderColor: 2
    };
  }

  // rotatePiece() {
  //   this.rotateBlocks();    
  //   if (this.hasCollision()) this.rotateBlocks(false);
  // }

  // rotateBlocks(clockwise = true) {
  //   const blocks = this.activePiece.blocks;
  //   const x = Math.floor(blocks.length / 2);
  //   const y = blocks.length - 1;

  //   for (let i = 0; i < x; i++) {
  //     for (let j = i; j < y - i; j++) {
  //       const temp = blocks[i][j];

  //       if (clockwise) {
  //         blocks[i][j] = blocks[y - j][i];
  //         blocks[y - j][i] = blocks[y - i][y - j];
  //         blocks[y - i][y - j] = blocks[j][y - i];
  //         blocks[j][y - i] = temp;
  //       } else {
  //         blocks[i][j] = blocks[j][y - i];
  //         blocks[j][y - i] = blocks[y - i][y - j];
  //         blocks[y - i][y - j] = blocks[y - j][i];
  //         blocks[y - j][i] = temp;
  //       }        
  //     }
  //   }
  // }

  moveHeroUp() {
    this.hero.y--;
    if (this.isOut()) this.hero.y++;
  };

  moveHeroDown() {
    // if (this.topOut) return;

    this.hero.y++;
    if (this.isOut()) this.hero.y--;
    // if (this.hasCollision()) {
    //   this.activePiece.y--;
    //   this.lockPiece();
    //   const clearedLines = this.clearLines();
    //   this.updateScore(clearedLines);
    //   this.updatePieces();
    // }
  };

  moveHeroRight() {
    this.hero.x++;
    if (this.isOut()) this.hero.x--;
    // if (this.hasCollision()) {
    //   this.activePiece.x--;
    // }
  };

  moveHeroLeft() {
    this.hero.x--;
    if (this.isOut()) this.hero.x++;
    // if (this.hasCollision()) {
    //   this.activePiece.x++
    // }
  };

  isOut() {
    const { x, y } = this.hero;
    if (x < 0 || y < 0 || x === this.columns || y === this.rows) {
      return true;
    }
  }

  // hasCollision() {
  //   const playfield = this.playfield;
  //   const { x: pieceX, y: pieceY, blocks } = this.activePiece;

  //   for (let y= 0; y < blocks.length; y++) {
  //     for (let x = 0; x < blocks[y].length; x++) {
  //       if (
  //         blocks[y][x] &&  
  //         (playfield[pieceY + y] === undefined || playfield[pieceY + y][pieceX + x] === undefined || playfield[pieceY + y][pieceX + x])
  //       ) return true;
  //     }
  //   }
  //   return false; 
  // };

  // lockPiece() {
  //   const { x: pieceX, y: pieceY, blocks } = this.activePiece;

  //   for (let y= 0; y < blocks.length; y++) {
  //     for (let x = 0; x < blocks[y].length; x++) {
  //       if (blocks[y][x]) {
  //         this.playfield[pieceY + y][pieceX + x] = blocks[y][x];
  //       }
  //     }
  //   }
  // }

  // clearLines() {
  //   const rows = 20;
  //   // const columns = 10;
  //   const lines = [];

  //   for (let y = rows - 1; y >= 0; y--) {
  //     if (!(this.playfield[y].some(x => x !== 0))) break;
  //     if ((this.playfield[y].includes(0))) continue;
  //     lines.unshift(y);
  //   }
  //   for (const index of lines) {
  //     this.playfield.splice(index,1);
  //     this.playfield.unshift(new Array(10).fill(0));
  //   }
  //   return lines.length;
  // }

  // updateScore(clearedLines) {
  //   if (clearedLines > 0) {
  //     this.score += Game.points[clearedLines] * (this.level + 1);
  //     this.lines += clearedLines;
  //   }

  // }
 
  // updatePieces() {
  //   this.activePiece = this.nextPiece;
  //   this.nextPiece = this.createPiece();

  //   if (this.hasCollision()) {
  //     this.topOut = true;
  //   }
  // }
}