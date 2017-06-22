// Variables
  let player;
  let board;
  let log = console.log;

// Elements
  const bowls = document.querySelectorAll('.bowl');
  const playerName = document.getElementById('player');
  const winMsg = document.getElementById('win-msg');
  const gameButton = document.getElementById('new-game');


// Functions
function initilize() {
  board = [4,4,4,4,4,4,0,4,4,4,4,4,4,0];
  player = true;
  updateBoard();
  playerName.textContent = 'Player 1';
}

function dropMarbles(bowl) {
  let bowls = document.querySelectorAll('#board .bowl');
  let idx = bowl.dataset.number;
  let turn = bowl.classList.contains('p1');
  let marbles = board[idx];
  board[idx] = 0;

  // drop marbles into designated bowls
  do {
    // go to next bowl
    idx++;
    // if current bowl is opposite player's scorebowl, skip
    if (idx > 13 || (!turn && idx === 13)) idx = 0;
    if (turn && idx === 6) idx++;

    // check for capture logic for player 1
    if (marbles === 1 && board[idx] === 0 && turn && !(idx === 13)) {
      // if (opponents bowl pair has anything in it or not) return
      let opMarbles;
      // add last marble to current player's scorebowl
      // add opponents opposite bowl to current player's score


      // test to see how to capture
      // board[13]++;
      // if (idx === 11) {
      //   opMarbles = board[1];
      //   board[1] = 0;
      //   board[13] += opMarbles;
      // }
      log('coming from capture logic');
      marbles--;
    } else {
      // drop marble in bowl
      board[idx]++;
      // update bowl
      bowl.textContent = board[idx];
      // subtract one marble
      marbles--;
    }
  }
  while (marbles > 0);

  // if last marble is dropped in players scorebowl, go again
  if (turn && idx === 13) player = !player;
  if (!turn && idx === 6) player = !player;
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
gameButton.addEventListener('click', initilize);
bowls.forEach(bowl => bowl.addEventListener('click', makeMove));
initilize();
