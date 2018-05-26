// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

//variable declarations
const cards = document.getElementsByClassName('card');
let openCards = [];
let moves = 0;
const movesDisplay = document.getElementsByClassName('moves');
let seconds = 0;
const secondsDisplay = document.getElementsByClassName('seconds');
let clock;
let matches = 0;
let topScore = undefined;
const topScoreDisplay = document.getElementsByClassName('topScore');


//create list of icons based off of HTML
const cardIcons = [];
for (card of cards) {
cardIcons.push(card.firstChild.nextSibling.className);
}

//apply shuffled icons to cards
function resetCards() {
  shuffle(cardIcons);
  for (i = 0; i < 16; i++) {
    cards[i].firstChild.nextSibling.className = cardIcons[i];
  }
}

function runTimer() {
  clock = setInterval( function() {
    seconds++;
    secondsDisplay[0].innerHTML = seconds;
  }, 1000);
}

//initial shuffle of cards
resetCards();
runTimer();

//refresh button functionality
let refresh = document.getElementById('refresh');
refresh.addEventListener('click', function() {
  refreshGame();
});

function refreshGame() {
  clearInterval(clock);
  openCards = [];
  for (card of cards) {
  card.className = 'card';
  }
  setTimeout(function() {
    resetCards();
    moves = 0;
    calcStars(moves);
    matches = 0;
    movesDisplay[0].innerHTML = moves;
    seconds = 0;
    secondsDisplay[0].innerHTML = 0;
    runTimer();
  },500)
}

//listen for clicks on closed cards and respond with functions
for (card of cards) {
  card.addEventListener('click', function() {
    if (this.className == 'card') {
      showCard(this);
      cardCounter(this);
      win();
    }
  });
}

function showCard(card) {
  card.className = 'card open show';
}

function cardCounter(card) {
  openCards.push(card);
  if (openCards.length === 1) {
    return;
  }
  else if (openCards.length === 2) {
    movesCounter();
    let card0 = document.getElementById(openCards[0].id);
    let card1 = document.getElementById(openCards[1].id);
    let card0Icon = openCards[0].firstChild.nextSibling.className;
    let card1Icon = openCards[1].firstChild.nextSibling.className;
    if (card0Icon === card1Icon) {
      match(card0,card1);
    }
    else {
      fail(card0,card1);

    }
  }
    openCards = [];
}

function movesCounter() {
  moves++;
  movesDisplay[0].innerHTML = moves;
  calcStars(moves);
}

function calcStars(moves) {
  let star1 = document.getElementById('star1');
  let star2 = document.getElementById('star2');
  let star3 = document.getElementById('star3');
  if (moves < 13) {
    star1.className = 'fa fa-star';
    star2.className = 'fa fa-star';
    star3.className = 'fa fa-star';
  } else if (moves < 16) {
    star3.className = 'fa fa-star-half-o';
  } else if (moves < 19) {
    star3.className = 'fa fa-star-o';
  } else if (moves < 22) {
    star2.className = 'fa fa-star-half-o';
  } else if (moves < 25) {
    star2.className = 'fa fa-star-o';
  }
  // } else if (moves < 27) {
  //   star1.className = 'fa fa-star-half-o';
  // } else {
  //   star1.className = 'fa fa-star-o';
  // }
}

function match(card0,card1) {
  setTimeout(function() {
    card0.className = 'card match engorge';
    card1.className = 'card match engorge';
  },750)
  setTimeout(function() {
    card0.className = 'card match';
    card1.className = 'card match';
  },1250)
  matches++;
}

function fail(card0,card1) {
  setTimeout(function() {
    card0.className = 'card open show shake';
    card1.className = 'card open show shake';
  },500)
  setTimeout(function() {
    card0.className = 'card open show shake2';
    card1.className = 'card open show shake2';
  },800)
  setTimeout(function() {
    card0.className = 'card open show shake';
    card1.className = 'card open show shake';
  },1100)
  setTimeout(function() {
    card0.className = 'card open show shake3';
    card1.className = 'card open show shake3';
  },1400)
  setTimeout(function() {
    card0.className = 'card';
    card1.className = 'card';
  },1900)
}

//win sequence - modal based off of tutorial at
//https://www.w3schools.com/howto/howto_css_modals.asp
function win() {
  if (matches === 8) {
    clearInterval(clock);
    if (topScore === undefined || topScore > moves) {
      topScore = moves;
      topScoreDisplay[0].innerHTML = `Top Score: ${topScore}`;
    }
    const movesMessage = document.getElementById('movesMessage');
    movesMessage.innerHTML = `You beat the game in ${moves} moves and ${seconds} seconds!`;
    const stars = document.getElementById('stars').innerHTML;
    const modalStars = document.getElementById('modalStars');
    modalStars.innerHTML = stars;
    setTimeout(function() {
      modal.style.display = "block";
    },501)
  }
}

const modal = document.getElementById('winModal');
const span = document.getElementsByClassName("close")[0];
const playAgain = document.getElementById('playAgain');

span.onclick = function() {
    modal.style.display = "none";
}

playAgain.onclick = function() {
    modal.style.display = "none";
    refreshGame();
}

window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}
