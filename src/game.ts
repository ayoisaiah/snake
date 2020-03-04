import createSnake from './snake';
import createFood from './food';
import createBoard from './board';
import createSidebar from './sidebar';

let interval: number;

const eatSound = new Audio('../sounds/eat.mp3');
const dieSound = new Audio('../sounds/lose.mp3');
eatSound.loop = false;
dieSound.loop = false;

// Updates the state of the game
function update(this: Game) {
  const { snake, food, board } = this;
  const head = snake.head();
  switch (snake.direction) {
    case 'left':
      head.x--;
      break;
    case 'right':
      head.x++;
      break;
    case 'up':
      head.y--;
      break;
    case 'down':
      head.y++;
      break;
  }

  snake.body.push({
    x: head.x,
    y: head.y,
  });

  if (snake.foodCollision(food)) {
    this.score += 10;
    food.move(snake, board);
    eatSound.play();
  } else {
    snake.body.shift();
  }
}

// Resets the game to its default state
function reset(this: Game) {
  const { snake, food, sidebar } = this;
  snake.direction = 'right';
  snake.body = [
    { x: 10, y: 10 },
    { x: 11, y: 10 },
    { x: 12, y: 10 },
  ];

  food.x = 30;
  food.y = 20;
  this.score = 0;
  this.running = false;

  sidebar.selectDifficulty.disabled = false;
  sidebar.startButton.disabled = false;
}

// Called when one of the end game conditions is met
function end(this: Game) {
  alert(`Game over. Your final score is ${this.score}`);
  clearInterval(interval);
  this.reset();
}

function draw(this: Game) {
  const { food, snake, board, sidebar } = this;
  if (snake.boardCollision(board) || snake.snakeCollision()) {
    dieSound.play();
    this.end();
  }

  const { canvas } = board;
  const context = canvas.getContext('2d') as CanvasRenderingContext2D;

  context.fillStyle = 'black';
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.fillStyle = 'lime';
  const { gridSize } = board;
  snake.body.forEach((coord: Coords) => {
    context.fillRect(
      coord.x * gridSize,
      coord.y * gridSize,
      gridSize - 2,
      gridSize - 2
    );
  });

  context.fillStyle = 'orange';
  context.fillRect(
    food.x * gridSize,
    food.y * gridSize,
    gridSize - 2,
    gridSize - 2
  );

  sidebar.scoreText.textContent = `${this.score}`;
}

// Renders the current state of the game onto the screen
function render(this: Game) {
  this.draw();
  requestAnimationFrame(this.render.bind(this));
}

// Starts the game when the start button is clicked
function start(this: Game) {
  const { sidebar, snake } = this;
  this.render();
  this.running = true;
  sidebar.startButton.disabled = true;
  sidebar.selectDifficulty.disabled = true;
  interval = window.setInterval(() => this.update(), 1000 / snake.speed);
}

// Initialises the board and game elements
function init(this: Game) {
  const { board, container, sidebar, snake } = this;
  this.draw();
  container.appendChild(board.canvas);
  container.appendChild(sidebar.node);

  sidebar.startButton.addEventListener('click', () => this.start());
  sidebar.selectDifficulty.addEventListener('click', () => {
    const { value } = sidebar.selectDifficulty;
    snake.updateSpeed(value);
  });

  document.addEventListener('keydown', event => {
    if (!this.running) return;
    const updated = snake.changeDirection(event.keyCode);
    if (updated) this.update();
  });
}

// Creates a new game instance
function newGame(el: HTMLElement): Game {
  if (el === undefined) {
    throw Error('Element must be passed');
  }

  const snake = createSnake();
  const board = createBoard();
  const food = createFood();
  const sidebar = createSidebar();

  return {
    container: el,
    score: 0,
    running: false,
    snake,
    board,
    food,
    sidebar,
    reset,
    update,
    end,
    draw,
    render,
    init,
    start,
  };
}

export default newGame;
