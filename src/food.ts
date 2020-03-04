// Moves the food to a new random position on the board
// Ensures the food does not appear inside the snake body
// when it is moved
function move(this: Food, snake: Snake, board: Board) {
  const x = Math.floor(Math.random() * board.tilesX);
  const y = Math.floor(Math.random() * board.tilesY);

  // Checks if the food coordinates are in the snake position
  const isSnake = snake.body.some(
    (coord: Coords) => x === coord.x && y === coord.y
  );

  if (isSnake) {
    // If so generate a new position for the food so that the it won't
    // appear inside the snake
    this.move(snake, board);
  } else {
    this.x = x;
    this.y = y;
  }
}

// Creates a new piece of food once the game starts
function createFood(): Food {
  return {
    x: 30,
    y: 20,
    move,
  };
}

export default createFood;
