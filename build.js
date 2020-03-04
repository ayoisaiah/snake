import newGame from './game';
var gameElement = document.getElementById('game');
// let interval: number;
var game = newGame(gameElement);
game.init(); // game.sidebar.startButton.addEventListener('click', () => {
 //   const { snake } = game;
 //   interval = window.setInterval(game.update, 1000 / snake.speed);
 //   game.running = true;
 //   game.sidebar.selectDifficulty.disabled = true;
 //   game.sidebar.startButton.disabled = true;
 // });
 // game.sidebar.selectDifficulty.addEventListener('change', () => {
 //   const { value } = game.sidebar.selectDifficulty;
 //   game.snake.updateSpeed(value);
 // });
 // document.addEventListener('keydown', event => {
 //   game.snake.changeDirection(event.keyCode);
 // });

