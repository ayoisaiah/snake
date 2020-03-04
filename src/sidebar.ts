const html = `
  <div class="sidebar">
      <div>Score: <span class="js-score-text">0</span></div>
      <div>
          <label for="difficulty">Difficulty: </label>
          <select class="js-select-difficulty">
              <option value="6">easy</option>
              <option selected value="12">normal</option>
              <option value="25">hard</option>
              <option value="35">extreme</option>
          </select>
      </div>
      <button class="js-start-button">Start game</button>

      <div class="instructions">
          <h4>Instructions:</h4>
          <ul>
              <li>Use ← → ↑ ↓ to move the snake around</li>
              <li>Pick up the food to grow bigger</li>
          </ul>
      </div>
  </div>
`;
function createSidebar(): Sidebar {
  const node = document.createRange().createContextualFragment(html);
  const startButton = node.querySelector(
    '.js-start-button'
  ) as HTMLButtonElement;
  const scoreText = node.querySelector('.js-score-text') as HTMLSpanElement;
  const selectDifficulty = node.querySelector(
    '.js-select-difficulty'
  ) as HTMLSelectElement;
  return {
    startButton,
    scoreText,
    selectDifficulty,
    node,
  };
}

export default createSidebar;
