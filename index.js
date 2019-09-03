import Game from './src/game.js';
import View from './src/view.js';
import Controller from './src/controller.js';

const root = document.querySelector('#root');
const options = {
  element: root,
  width: 640,
  height: 480,
  columns: 80,
  rows: 50,
  coastWidth: 2
}

const game = new Game(options);
const view = new View(options);
const controller = new Controller(game, view);

window.game = game;
window.view = view;
window.controller = controller;