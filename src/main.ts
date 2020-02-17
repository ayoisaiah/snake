const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const context = canvas.getContext('2d') as CanvasRenderingContext2D;
const startButton = document.getElementById('start') as HTMLButtonElement;
const selectDifficulty = document.getElementById(
  'difficulty'
) as HTMLSelectElement;
const score = document.getElementById('score') as HTMLSpanElement;

let interval: number;

type Coords = {
  x: number;
  y: number;
};

type Snake = {
  direction: string;
  body: Coords[];
  speed: number;
  head: () => Coords;
};

let snake: Snake = {
  direction: 'right',
  body: [
    { x: 10, y: 10 },
    { x: 11, y: 10 },
    { x: 12, y: 10 },
  ],
  speed: 10,
  head() {
    return { ...this.body[this.body.length - 1] };
  },
};

type Food = Coords & {
  move: () => void;
};

let food: Food = {
  x: 30,
  y: 20,
  move() {
    this.x = Math.floor(Math.random() * game.tilesX);
    this.y = Math.floor(Math.random() * game.tilesY);
  },
};

const game = {
  gridSize: 20,
  score: 0,
  tilesX: 40,
  tilesY: 30,
  running: false,
};

function resetGame() {
  snake.direction = 'right';
  snake.body = [
    { x: 10, y: 10 },
    { x: 11, y: 10 },
    { x: 12, y: 10 },
  ];

  food.x = 30;
  food.y = 20;
  game.score = 0;
  game.running = false;
  selectDifficulty.disabled = false;
  startButton.disabled = false;
}

function gameOver() {
  alert(`Game over. Your final score is ${game.score}`);
  clearInterval(interval);
  resetGame();
}

function snakeCollision() {
  const head = snake.head();
  for (let i = 0; i < snake.body.length - 1; i++) {
    if (snake.body[i].x === head.x && snake.body[i].y === head.y) {
      return true;
    }
  }

  return false;
}

function foodCollision() {
  const head = snake.head();
  return food.x === head.x && food.y === head.y;
}

function borderCollision() {
  const head = snake.head();
  if (
    head.x < 0 ||
    head.x > game.tilesX - 1 ||
    head.y < 0 ||
    head.y > game.tilesY - 1
  ) {
    return true;
  }

  return false;
}

function update() {
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

  if (foodCollision()) {
    game.score++;
    food.move();
  } else {
    snake.body.shift();
  }
  console.log(head);
}

function render() {
  if (borderCollision() || snakeCollision()) {
    gameOver();
  }

  context.fillStyle = 'black';
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.fillStyle = 'lime';
  const { gridSize } = game;
  for (let i = 0; i < snake.body.length; i++) {
    context.fillRect(
      snake.body[i].x * gridSize,
      snake.body[i].y * gridSize,
      gridSize - 2,
      gridSize - 2
    );
  }

  context.fillStyle = 'orange';
  context.fillRect(
    food.x * gridSize,
    food.y * gridSize,
    gridSize - 2,
    gridSize - 2
  );

  score.textContent = `${game.score}`;

  requestAnimationFrame(render);
}

function changeDirection(event: KeyboardEvent) {
  if (!game.running) return;

  const { direction } = snake;
  switch (event.keyCode) {
    case 37:
      if (direction !== 'right') {
        snake.direction = 'left';
      }
      break;
    case 38:
      if (direction !== 'down') {
        snake.direction = 'up';
      }
      break;
    case 39:
      if (direction !== 'left') {
        snake.direction = 'right';
      }
      break;
    case 40:
      if (direction !== 'up') {
        snake.direction = 'down';
      }
      break;
  }
  update();
}

function updateDifficulty() {
  const { value } = selectDifficulty;
  snake.speed = Number(value);
}

render();

startButton.addEventListener('click', () => {
  interval = window.setInterval(update, 1000 / snake.speed);
  game.running = true;
  selectDifficulty.disabled = true;
  startButton.disabled = true;
});

selectDifficulty.addEventListener('change', updateDifficulty);
document.addEventListener('keydown', changeDirection);
