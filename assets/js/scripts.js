let inited = true;
let cards = ['bobrossparrot', 'explodyparrot', 'fiestaparrot', 'metalparrot', 'revertitparrot', 'tripletsparrot', 'unicornparrot'];

while (inited) {
  let nmrCard = prompt("Quantas cartas você quer jogar?");

  if ((nmrCard % 2 == 0) && (nmrCard >= 2) && (nmrCard <= 14)) {
    inited = false;

    createDeck(nmrCard);
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
}


function comparator() {
  return Math.random() - 0.5;
}

/*function restartMatch() {
  let confirm = confirm("Deseja reiniciar seu jogo?");

  if (confirm) {
    document.write("Iniciando novo jogo...");
  } else {
    document.write("Seu jogo foi encerrado...");
  }
}*/


