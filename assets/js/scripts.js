let inited = true;
let seconds = 59;
let minutes = 0;
let startingSecondsId = null;
let upCard1 = null;
let firstCardBack = null;
let firstCardFront = null;
let correctCardCounter = 0;
let amoutCardsOnBoard = 0;
let numberOfTotalPlays = 0;
let cards = ['bobrossparrot', 'explodyparrot', 'fiestaparrot', 'metalparrot', 'revertitparrot', 'tripletsparrot', 'unicornparrot'];

function start() {
  while (inited) {
    let amoutCards = prompt("Quantas cartas você quer jogar?");

    amoutCardsOnBoard = amoutCards;

    if ((amoutCards % 2 == 0) && (amoutCards >= 2) && (amoutCards <= 14)) {
      inited = false;

      startingSecondsId = startingSeconds();

      createDeck(amoutCards);
    }
  }
}

function shuffleCard(amountCards) {
  cards.sort(comparator);

  cards.length = amountCards / 2;
}

function createDeck(amoutCards) {
  let ul = document.querySelector('.container');

  let listLi = [];

  for (let i = 0; i < 2; i++) {
    shuffleCard(amoutCards);

    for (let j = 0; j < cards.length; j++) {
      listLi.push(`
          <li class="card" onclick="turnCard(this)" data-identifier="card">
            <div class="card-front" data-identifier="back-face"></div>
            <div style="background-image: url('assets/img/${cards[j]}.gif');" class="card-back dn" identifier="front-face"></div>
          </li>`);
    }
  }

  listLi.sort(comparator);

  for (var i = 0; i < listLi.length; i++) {
    ul.innerHTML += listLi[i]
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

        document.body.classList.remove("disable-click");
      }, 1000);

      document.body.classList.add("disable-click");
    }
  }
}

function checkWinCondition() {
  if (correctCardCounter == amoutCardsOnBoard) {
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
  minutes = 0;
  upCard1 = null;
  firstCardBack = null;
  firstCardFront = null;
  correctCardCounter = 0;
  amoutCardsOnBoard = 0;
  numberOfTotalPlays = 0;
}

function startingSeconds() {
  return setInterval(function () {
    if (seconds == 60) {
      seconds = 0;
      minutes += 1;

      console.log(minutes);

      document.querySelector('header span').innerHTML = minutesFixed(minutes);
    }

    seconds += 1;
    document.querySelector('header span:last-child').innerHTML = secondesFixed(seconds);
  }, 1000);
}

function minutesFixed(minutes) {
  if (minutes < 10) {
    return "0" + minutes;
  } else {
    return minutes;
  }
}

function secondesFixed(seconds) {
  if (seconds < 10) {
    return "0" + seconds;
  } else {
    return seconds;
  }
}

function comparator() {
  return Math.random() - 0.5;
}

start();