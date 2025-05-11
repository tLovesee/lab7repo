const board = document.getElementById('board');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X';
let cells = Array(9).fill(null);
let gameOver = false;

function createBoard() {
  board.innerHTML = '';
  cells = Array(9).fill(null);
  gameOver = false;
  currentPlayer = 'X';
  statusText.textContent = "Player X's turn";

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    cell.addEventListener('click', handleMove);
    board.appendChild(cell);
  }
}

function handleMove(e) {
  const index = e.target.dataset.index;

  if (cells[index] || gameOver) return;

  cells[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWinner(currentPlayer)) {
    statusText.textContent = `Player ${currentPlayer} wins! 🎉`;
    gameOver = true;
  } else if (cells.every(cell => cell)) {
    statusText.textContent = "It's a draw! 🤝";
    gameOver = true;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWinner(player) {
  const winCombos = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  return winCombos.some(combo =>
    combo.every(i => cells[i] === player)
  );
}

resetButton.addEventListener('click', createBoard);
createBoard();

