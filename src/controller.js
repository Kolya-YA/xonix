export default class Controller {
  constructor(game, view) {
    this.game = game;
    this.view = view;
    // this.intervalId = null;
    this.isPlaying = false;

    document.addEventListener('keydown', this.handleKeyDown.bind(this));
    // document.addEventListener('keyup', this.handleKeyUp.bind(this));

    // this.view.renderStartScreen();
    this.view.renderMainScreen(this.game.getState()); //temp
  }

  // update() {
  //   this.game.movePieceDown();
  //   this.updateView();
  // }

  // play() {
  //   this.isPlaying = true;
  //   this.startTimer();
  //   this.updateView();
  // }

  // pause() {
  //   this.isPlaying = false;
  //   this.stopTimer();
  //   this.updateView();
  // }

  // reset() {
  //   this.game.reset();
  //   this.play;
  // }

  updateView() {
    const state = this.game.getState();
    if (state.isGameOver) this.view.renderGameOverScreen(state)
    // else if (!this.isPlaying) this.view.renderPauseScreen();
    else this.view.renderMainScreen(state);
  }

  // startTimer() {
  //   const speed = this.game.level < 10 ? 1000 - this.game.level * 100 : 100;

  //   if (!this.intervalId) {
  //     this.intervalId = setInterval(() => {
  //       this.update();
  //     }, speed);
  //   }
  // }

  // stopTimer() {
  //   if (this.intervalId) {
  //     clearInterval(this.intervalId);
  //     this.intervalId = null;
  //   }
  // }

  handleKeyDown(event) {
    // const state = this.game.getState();

    switch (event.keyCode) {
      // case 13: // Enter
      //   if (state.isGameOver) this.reset();
      //   else if (this.isPlaying) this.pause();
      //   else this.play();      
      //   break;
      case 37: // left arrow
        this.game.moveHeroLeft();
        this.updateView();
        break;
      case 38: // up arrow
        this.game.moveHeroUp();
        this.updateView();
        break;
      case 39: // right arrow
        this.game.moveHeroRight();
        this.updateView();
        break;
      case 40: // down arrow
        // this.stopTimer();
        this.game.moveHeroDown();
        this.updateView();
        break;
      }
    }
    
  //   handleKeyUp(event) {
  //     if (event.keyCode === 40) this.startTimer();
  //   }
}