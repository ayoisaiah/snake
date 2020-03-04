type direction = 'left' | 'up' | 'right' | 'down';

type speed = 6 | 12 | 25 | 35;

type Coords = {
  x: number;
  y: number;
};

type Snake = {
  direction: direction;
  body: Coords[];
  speed: speed;
  head: () => Coords;
  updateSpeed: (speed: string) => void;
  changeDirection: (keyCode: number) => boolean;
  snakeCollision: () => boolean;
  foodCollision: (food: Food) => boolean;
  boardCollision: (board: Board) => boolean;
};

type Sidebar = {
  startButton: HTMLButtonElement;
  selectDifficulty: HTMLSelectElement;
  scoreText: HTMLSpanElement;
  node: DocumentFragment;
};

type Board = {
  canvas: HTMLCanvasElement;
  gridSize: number;
  tilesX: number;
  tilesY: number;
};

type Game = {
  container: HTMLElement;
  score: number;
  running: boolean;
  snake: Snake;
  food: Food;
  board: Board;
  sidebar: Sidebar;
  reset: () => void;
  update: () => void;
  render: () => void;
  end: () => void;
  init: () => void;
  draw: () => void;
  start: () => void;
};

type Food = Coords & {
  move: (snake: Snake, board: Board) => void;
};
