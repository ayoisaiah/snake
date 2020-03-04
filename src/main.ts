import newGame from './game';

const gameElement = document.getElementById('game') as HTMLDivElement;

const game = newGame(gameElement);

game.init();
