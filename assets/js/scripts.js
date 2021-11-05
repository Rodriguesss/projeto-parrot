let inited = true;
let seconds = 0;
let startingSecondsId = null;
let upCard1 = null;
let firstCardBack = null;
let firstCardFront = null;
let correctCardCounter = 0;
let numberCardOnBoard = 0;
let numberOfTotalPlays = 0;
let cards = ['bobrossparrot', 'explodyparrot', 'fiestaparrot', 'metalparrot', 'revertitparrot', 'tripletsparrot', 'unicornparrot'];

function start() {
  while (inited) {
    let numberCard = prompt("Quantas cartas você quer jogar?");

    numberCardOnBoard = numberCard;

    if ((numberCard % 2 == 0) && (numberCard >= 2) && (numberCard <= 14)) {
      inited = false;

      startingSecondsId =  startingSeconds();

      createDeck(numberCard);
    }
  }
}

function shuffleCard(number) {
  cards.sort(comparator);

  cards.length = number / 2;
}

function createDeck(number) {
  let ul = document.querySelector('.container');

  for (let i = 0; i < 2; i++) {
    shuffleCard(number);

    for (let j = 0; j < cards.length; j++) {
      ul.innerHTML += `
        <li class="card" onclick="turnCard(this)" data-identifier="card">
          <div class="card-front" data-identifier="back-face"></div>
          <div style="background-image: url('assets/img/${cards[j]}.gif');" class="card-back dn" identifier="front-face"></div>
        </li>`;
    }
  }
}

function turnCard(li) {
  let cardFront = li.querySelector('.card-front');
  let cardBack = li.querySelector('.card-back');

  cardFront.classList.add("dn");
  cardBack.classList.remove("dn");

  numberOfTotalPlays++;

  checkIfCardsMatch(cardBack, cardFront);
}

function checkIfCardsMatch(cardBack, cardFront) {
  cardBack.parentNode.removeAttribute("onclick");

  if (upCard1 == null) {
    upCard1 = window.getComputedStyle(cardBack).getPropertyValue('background-image');

    firstCardBack = cardBack;
    firstCardFront = cardFront;

  } else {
    let upCard2 = window.getComputedStyle(cardBack).getPropertyValue('background-image');

    if (upCard1 == upCard2) {
      cleanCardAttributes();

      correctCardCounter += 2;

      checkWinCondition();
    } else {
      setTimeout(function () {
        cardFront.classList.remove("dn");
        cardBack.classList.add("dn");
        cardBack.parentNode.setAttribute("onclick", "turnCard(this)");

        firstCardFront.classList.remove("dn");
        firstCardBack.classList.add("dn");
        firstCardBack.parentNode.setAttribute("onclick", "turnCard(this)");

        cleanCardAttributes();
      }, 1000);
    }
  }
}

function checkWinCondition() {
  if (correctCardCounter == numberCardOnBoard) {
    alert(`Você ganhou em ${numberOfTotalPlays} jogadas e ${seconds} segundos.`);

    let condition = prompt("Você quer começar um novo jogo?");

    if (condition.toUpperCase() == "SIM") {
      inited = true;

      cleanAllAttributes();

      removeCards();

      clearInterval(startingSecondsId);

      start();
    }
  }
}

function removeCards() {
  let cards = document.querySelectorAll('li');

  for (let i = 0; i < cards.length; i++) {
    cards[i].parentNode.removeChild(cards[i]);
  }
}

function cleanCardAttributes() {
  upCard1 = null;
  firstCardBack = null;
  firstCardFront = null;
}

function cleanAllAttributes() {
  inited = true;
  seconds = 0;
  upCard1 = null;
  firstCardBack = null;
  firstCardFront = null;
  correctCardCounter = 0;
  numberCardOnBoard = 0;
  numberOfTotalPlays = 0;
}

function startingSeconds() {
  return setInterval(function() {
    seconds += 1;
    document.querySelector('header div').innerHTML = seconds;
  }, 1000);
}

function comparator() {
  return Math.random() - 0.5;
}

start();