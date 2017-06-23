// Variables
let player, board, gameover;

// Elements
const bowls = document.querySelectorAll('.bowl');
const winMsg = document.getElementById('win-msg');
const playerName = document.getElementById('player');
const gameButton = document.getElementById('new-game');

// Functions
function initilize() {
  board = [4,4,4,4,4,4,0,4,4,4,4,4,4,0];
  player = true;
  gameover = false;
  updateBoard();
  winMsg.textContent = '';
  playerName.textContent = 'Player 1';
}

function dropMarbles(bowl) {
  let idx = bowl.dataset.number;
  let turn = bowl.classList.contains('p1');
  let marbles = board[idx];
  board[idx] = 0;
  do {
    idx++;
    // if current bowl is opposite player's scorebowl, skip
    if (idx > 13 || (!turn && idx === 13)) idx = 0;
    if (turn && idx === 6) idx++;
    // capture logic
    if (marbles === 1 && board[idx] === 0) {
      board[idx]++;
      bowl.textContent = board[idx];
      captureStones(idx, turn, bowl);
      marbles--;
    } else {
      board[idx]++;
      bowl.textContent = board[idx];
      marbles--;
    }
  }
  while (marbles > 0);
  // if last marble is dropped in players scorebowl, go again
  if (turn && idx === 13) player = !player;
  if (!turn && idx === 6) player = !player;
}

function captureStones(idx, turn, bowl) {
  const pairs = [
  [12, 0],
  [11, 1],
  [10, 2],
  [9, 3],
  [8, 4],
  [7, 5]
  ];
  for (let i = 0; i < pairs.length; i++) {
    const [a, b] = pairs[i];
    // find the pair of bowls
    if (idx === a && turn) {
      // if opponents bowl is empty
      if (board[b] === 0) return;
      // if not empty, capture
      board[13] += board[a] + board[b];
      board[a] = 0;
      board[b] = 0;
    } else if (idx === b && !turn) {
      if (board[a] === 0) return;
      board[6] += board[a] + board[b];
      board[a] = 0;
      board[b] = 0;
    }
  }
}

function collectMarbles() {
  const lines = [
    [7,8,9,10,11,12],
    [0,1,2,3,4,5]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a,b,c,d,e,f] = lines[i];
    if (board[a] === 0 && board[b] === 0 && board[c] === 0 && board[d] === 0 && board[e] === 0 && board[f] === 0) {
      for (let x = 7; x < 13; x++) {
        board[13] += board[x];
        board[x] = 0;
      }
      for (var y = 0; y < 6; y++) {
        board[6] += board[y];
        board[y] = 0;
      }
      gameover = true;
    }
  }
  checkWinner();
}

function updateBoard() {
  bowls.forEach(bowl => {
    bowl.textContent = board[bowl.dataset.number];
  })
  playerName.textContent = player ? 'Player 1' : 'Player 2';
  playerName.style.color = player ? '#00BDBA' : '#8F00D3';
}

function checkWinner() {
  if (gameover) {
    winMsg.textContent = board[13] > board[6] ? 'Player 1 Wins!' : 'Player 2 Wins!';
    winMsg.style.color = board[13] > board[6] ? '#00BDBA' : '#8F00D3';
  }
}

function makeMove(e) {
  if (player) {
    if (this.className.includes('p2') || this.className.includes('store') || this.textContent == 0) return;
  } else {
    if (this.className.includes('p1') || this.className.includes('store') || this.textContent == 0) return;
  }
  dropMarbles(this);
  collectMarbles();
  player = !player;
  updateBoard();
  checkWinner();
}

// Event Handlers
gameButton.addEventListener('click', initilize);
bowls.forEach(bowl => bowl.addEventListener('click', makeMove));
initilize();
