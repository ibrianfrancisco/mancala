// Variables
  let player = true;
  let board = [4,4,4,4,4,4,0,4,4,4,4,4,4,0];
  let log = console.log;

// Elements
  const bowls = document.querySelectorAll('.bowl');
  const playerName = document.getElementById('player');
  const winMsg = document.getElementById('win-msg');
  const newGame = document.getElementById('new-game');


// Functions
function initilize() {
  board = [4,4,4,4,4,4,0,4,4,4,4,4,4,0];
  player = true;
  updateBoard();
  playerName.textContent = 'Player 1';
}

function dropMarbles(bowl) {
  // board[6] is player 2's scorer
  // board[13] is player 1's scorer
  let bowls = document.querySelectorAll('#board .bowl');
  let idx = bowl.dataset.number;
  let turn = bowl.classList.contains('p1');
  let counter = 0;

  // put clicked bowl marbles in counter variable
  do {
    board[idx]--;
    counter++;
  }
  while (board[idx] > 0);

  do {
    idx++;
    if (idx > 13) {
      idx = 0;
    }
    board[idx]++;
    bowl.textContent = board[idx];
    counter--;
  }
  while (counter > 0);

  updateBoard();
}

function updateBoard() {
  bowls.forEach(bowl => {
    bowl.textContent = board[bowl.dataset.number];
  })
  playerName.textContent = player ? 'Player 1' : 'Player 2';
  playerName.style.color = player ? '#00BDBA' : '#8F00D3';
}

function makeMove(e) {
  if (player) {
    if (this.className.includes('p2') || this.className.includes('store') || this.textContent == 0) return;
  } else {
    if (this.className.includes('p1') || this.className.includes('store') || this.textContent == 0) return;
  }

  dropMarbles(this);
  player = !player;
  updateBoard();

}


// Event Handlers
newGame.addEventListener('click', initilize());
bowls.forEach(bowl => bowl.addEventListener('click', makeMove));

