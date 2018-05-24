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

let cards = document.getElementsByClassName('card');
let openCards = [];
let moves = 0;
let movesDisplay = document.getElementsByClassName('moves');
let matches = 0;

//create list of icons based off of HTML
const cardIcons = [];
for (card of cards) {
cardIcons.push(card.firstChild.nextSibling.className);
}

function resetCards() {
  shuffle(cardIcons);
  for (i = 0; i < 16; i++) {
    cards[i].firstChild.nextSibling.className = cardIcons[i];
  }
}

//initial shuffle of cards
resetCards();

//refresh button functionality
let refresh = document.getElementById('refresh');
refresh.addEventListener('click', function() {
  resetCards();
  moves = 0;
  calcStars(moves);
  matches = 0;
  movesDisplay[0].innerHTML = moves;
  for (card of cards) {
  card.className = 'card';
  }
});

//TODO need CSS transitions for cards
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



for (card of cards) {
  card.addEventListener('click', function() {
    if (this.className != 'card open show' && this.className != 'card match') {
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
  if (moves < 11) {
    star1.className = 'fa fa-star'
    star2.className = 'fa fa-star'
    star3.className = 'fa fa-star'
  } else if (moves < 14) {
    star3.className = 'fa fa-star-half-o'
  } else if (moves < 16) {
    star3.className = 'fa fa-star-o'
  } else if (moves < 19) {
    star2.className = 'fa fa-star-half-o'
  } else if (moves < 21) {
    star2.className = 'fa fa-star-o'
  } else if (moves < 24) {
    star1.className = 'fa fa-star-half-o'
  } else {
    star1.className = 'fa fa-star-o'
  }
}

function match(card0,card1) {
  card0.className = 'card match engorge'
  card1.className = 'card match engorge'
  setTimeout(function() {
    card0.className = 'card match'
    card1.className = 'card match'
  },1000)
  matches++;
}

function fail(card0,card1) {
  setTimeout(function() {
    card0.className = 'card open show shake'
    card1.className = 'card open show shake'
  },500)
  setTimeout(function() {
    card0.className = 'card open show shake2'
    card1.className = 'card open show shake2'
  },800)
  setTimeout(function() {
    card0.className = 'card open show shake'
    card1.className = 'card open show shake'
  },1100)
  setTimeout(function() {
    card0.className = 'card open show shake3'
    card1.className = 'card open show shake3'
  },1400)
  setTimeout(function() {
    card0.className = 'card'
    card1.className = 'card'
  },1900)
}

//win sequence - modal based off of tutorial at
//https://www.w3schools.com/howto/howto_css_modals.asp
function win() {
  if (matches === 8) {
    const movesMessage = document.getElementById('movesMessage');
    movesMessage.innerHTML = `You beat the game in ${moves} moves`;
    // const
    setTimeout(function() {
      modal.style.display = "block";
    },1000)
  }

}

const modal = document.getElementById('winModal');
const span = document.getElementsByClassName("close")[0];

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}
