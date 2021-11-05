let inited = true;
let cards = ['bobrossparrot', 'explodyparrot', 'fiestaparrot', 'metalparrot', 'revertitparrot', 'tripletsparrot', 'unicornparrot'];

while (inited) {
  let nmCard = prompt("Quantas cartas você quer jogar?");

  if ((nmCard % 2 == 0) && (nmCard >= 2) && (nmCard <= 14)) {
    inited = false;

    drawCard(nmCard);

    createDeck(nmCard);
  }
}

function drawCard(nmr) {
  cards.sort(comparator);

  let half = nmr / 2;

  cards.length = half;
}

function createDeck(nmr) {
  let ul = document.querySelector('.container');

  for (let i = 0; i < nmr; i++) {
    ul.innerHTML += `<li class="card"></li>`;
  }

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


