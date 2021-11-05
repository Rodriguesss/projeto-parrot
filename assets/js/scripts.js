let inited = true;
let upCard1 = null;
let firstCardBack = null;
let firstCardFront = null;
let correctCardCounter = 0;
let nmrCardOnBoard = 0;
let nmrOfTotalPlays = 0;
let cards = ['bobrossparrot', 'explodyparrot', 'fiestaparrot', 'metalparrot', 'revertitparrot', 'tripletsparrot', 'unicornparrot'];

function start() {
  while (inited) {
    let nmrCard = prompt("Quantas cartas você quer jogar?");

    nmrCardOnBoard = nmrCard;

    if ((nmrCard % 2 == 0) && (nmrCard >= 2) && (nmrCard <= 14)) {
      inited = false;

      createDeck(nmrCard);
    }
  }
}

function drawCard(nmr) {
  cards.sort(comparator);

  cards.length = nmr / 2;
}

function createDeck(nmr) {
  let ul = document.querySelector('.container');

  for (let i = 0; i < 2; i++) {
    drawCard(nmr);

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

  nmrOfTotalPlays++;

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
  if (correctCardCounter == nmrCardOnBoard) {
    alert(`Você ganhou em ${nmrOfTotalPlays} jogadas.`);

    let condition = prompt("Você quer começar um novo jogo?");

    if (condition.toUpperCase() == "SIM") {
      inited = true;

      cleanAllAttributes();

      start();
    }
  }
}

function cleanCardAttributes() {
  upCard1 = null;
  firstCardBack = null;
  firstCardFront = null;
}

function cleanAllAttributes() {
  inited = true;
  upCard1 = null;
  firstCardBack = null;
  firstCardFront = null;
  correctCardCounter = 0;
  nmrCardOnBoard = 0;
  nmrOfTotalPlays = 0;
}

function comparator() {
  return Math.random() - 0.5;
}

start();