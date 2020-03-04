// Updates the speed of the snake. Only called before the start
// of the game
function updateSpeed(this: Snake, speed: string) {
  this.speed = Number(speed) as speed;
}

// Returns the coordinates of the snake's head
function head(this: Snake): Coords {
  return { ...this.body[this.body.length - 1] };
}

// Changes the direction of the snake based on the key that was pressed
// (up, down, left or right)
function changeDirection(this: Snake, keyCode: number) {
  const { direction } = this;
  switch (keyCode) {
    case 37:
      if (direction !== 'right') {
        this.direction = 'left';
      }
      return true;
    case 38:
      if (direction !== 'down') {
        this.direction = 'up';
      }
      return true;
    case 39:
      if (direction !== 'left') {
        this.direction = 'right';
      }
      return true;
    case 40:
      if (direction !== 'up') {
        this.direction = 'down';
      }
      return true;
  }

  return false;
}

// Checks if the snake body contains its own head, if so it will return true.
function snakeCollision(this: Snake) {
  const head = this.head();
  for (let i = 0; i < this.body.length - 1; i++) {
    if (this.body[i].x === head.x && this.body[i].y === head.y) {
      return true;
    }
  }

  return false;
}

// Checks if the snake's head collides with the food. If so, returns true
function foodCollision(this: Snake, food: Food) {
  const head = this.head();
  return food.x === head.x && food.y === head.y;
}

// Checks if the snake's head collides with the walls of the board. If so,
// returns true
function boardCollision(this: Snake, board: Board) {
  const head = this.head();
  if (
    head.x < 0 ||
    head.x > board.tilesX - 1 ||
    head.y < 0 ||
    head.y > board.tilesY - 1
  ) {
    return true;
  }

  return false;
}

// Creates a new snake when the game is initialised
function createSnake(): Snake {
  return {
    direction: 'right',
    body: [
      { x: 10, y: 10 },
      { x: 11, y: 10 },
      { x: 12, y: 10 },
    ],
    speed: 12,
    head,
    updateSpeed,
    changeDirection,
    snakeCollision,
    boardCollision,
    foodCollision,
  };
}

export default createSnake;
