/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

let cards = document.getElementsByClassName('card');;
let openCards = [];
let moves = 0;

function getCards() {
  cards = document.getElementsByClassName('card');
}

for (card of cards) {
  card.addEventListener('click', function() {
    if (this.className != 'card open show' && this.className != 'card match') {
      showCard(this);
      cardCounter(this);
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
  const movesDisplay = document.getElementsByClassName('moves');
  console.log(movesDisplay);
  movesDisplay[0].innerHTML = moves;
  calcStars(moves);
}

function calcStars(moves) {
  if (moves < 11) {
    return;
  } else if (moves < 14) {
    let star3 = document.getElementById('star3');
    star3.className = 'fa fa-star-half-o'
  } else if (moves < 16) {
    let star3 = document.getElementById('star3');
    star3.className = 'fa fa-star-o'
  } else if (moves < 19) {
    let star2 = document.getElementById('star2');
    star2.className = 'fa fa-star-half-o'
  } else if (moves < 21) {
    let star2 = document.getElementById('star2');
    star2.className = 'fa fa-star-o'
  } else if (moves < 24) {
    let star1 = document.getElementById('star1');
    star1.className = 'fa fa-star-half-o'
  } else {
    let star1 = document.getElementById('star1');
    star1.className = 'fa fa-star-o'
  }
}

function match(card0,card1) {
  console.log('match')
  setTimeout(function() {
    card0.className = 'card match'
    card1.className = 'card match'
  },750)
}

function fail(card0,card1) {
  console.log('FAIL')
  setTimeout(function() {
    card0.className = 'card'
    card1.className = 'card'
  },1500)
}
