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
    this.level = 5;
  //   this.score = 0;
  //   this.topOut = false;
    this.playfield = this.createPlayfield();
    this.hero = this.createHero();
    this.seaEnemies = this.createSeaEnemies();
    this.landEnemies = this.createLandEnemies();
  }

  getState() {
    const playfield = this.playfield.slice().map(x => x.slice());
    const { x, y, bodyColor } = this.hero;
    playfield[y][x] = bodyColor;
    this.seaEnemies.forEach(enemy => {
      playfield[enemy.y][enemy.x] = enemy.enemyColor;
    })
    this.landEnemies.forEach(enemy => {
      playfield[enemy.y][enemy.x] = enemy.enemyColor;
    })

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
      sailing: false,
      bodyColor: 7,
      borderColor: 2
    };
  }

  createSeaEnemies() {
    const seaEnemy = [];
    for (let i = 0; i < this.level * 2; i++) {
      const side = Math.floor(Math.random() * 4);
      const sideSize = side % 2 ? this.columns : this.rows;
      const position = Math.floor(Math.random() * (sideSize - 4)) + 2
      const direction = Math.floor(Math.random() * 4);
      const x = side % 2 ? position : (side === 2 ? 77 : 2);
      const y = side % 2 ? (side === 1 ? 47 : 2) : position;
      const enemyColor = 8; // move to options
      seaEnemy.push({ x, y, direction, enemyColor });
    }
    return seaEnemy;
  }

  createLandEnemies() {
    const landEnemies = [];
    for (let i = 0; i < this.level / 2; i++) {
      const side = Math.floor(Math.random() * 3);
      const sideSize = side % 2 ? this.columns : this.rows;
      const position = Math.floor(Math.random() * sideSize);
      const direction = Math.floor(Math.random() * 4);
      const x = side % 2 ? position : (side === 2 ? 79 : 0);
      const y = side % 2 ? 49 : position;
      const enemyColor = 9; // move to options
      landEnemies.push({ x, y, direction, enemyColor });
    }
    console.log(landEnemies)
    return landEnemies;
  }

  moveHeroUp() {
    this.hero.y--;
    if (this.isOut()) this.hero.y++;
    this.atSea();
  };

  moveHeroDown() {
    // if (this.topOut) return;

    this.hero.y++;
    if (this.isOut()) this.hero.y--;
    this.atSea();
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
    this.atSea();
    // if (this.hasCollision()) {
    //   this.activePiece.x--;
    // }
  };

  moveHeroLeft() {
    this.hero.x--;
    if (this.isOut()) this.hero.x++;
    this.atSea();
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

  atSea() {
    const { x, y, sailing } = this.hero;
    if (this.playfield[y][x] === 0) {
      if (!sailing) this.hero.sailing = true;
      this.playfield[y][x] = 5;
      return;
    }

    if (sailing) {
      if (this.playfield[y][x] === 5) {
        this.lifeOut();
        return;
      }
      if (this.playfield[y][x] === 3) {
        this.hero.sailing = false;
        this.fillCoast();
      }
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

  fillCoast() {
    console.log('fillCoast');
  }

  lifeOut() {
    // -1 life and continue
    console.log('Boom! -1 life');
    this.hero.x = this.columns / 2;
    this.hero.y = 0;
    this.hero.sailing = false;
    this.playfield = this.playfield.map(line => line.map(cell => cell === 5 ? cell = 0 :cell))
  }

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