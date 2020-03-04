// Creates a new board where the snake will be drawn
function createBoard(width = 800, height = 600): Board {
  const canvas = document.createElement('canvas') as HTMLCanvasElement;
  canvas.width = width;
  canvas.height = height;

  const gridSize = 20;

  return {
    canvas,
    gridSize,
    tilesX: width / gridSize,
    tilesY: height / gridSize,
  };
}

export default createBoard;
