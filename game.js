const startScreen = document.getElementById("startScreen");
const gameScreen = document.getElementById("gameScreen");
const endScreen = document.getElementById("endScreen");
const endTitle = document.getElementById("endTitle");
const gridEl = document.getElementById("grid");

let cards = [
  { name: "code", img: "assets/code.png" },
  { name: "docs", img: "assets/docs.png" },
  { name: "bug", img: "assets/bug.png" },
  { name: "feature", img: "assets/feature.png" },
  { name: "nessy", img: "assets/nessy.png" },
  { name: "endless", img: "assets/endless.png" }
];

let gameCards = [];
let firstCard = null;
let lockBoard = false;
let matches = 0;

function startGame() {
  startScreen.classList.remove("active");
  endScreen.classList.remove("active");
  gameScreen.classList.add("active");

  // duplicate cards for pairs
  gameCards = [...cards, ...cards];
  shuffle(gameCards);

  matches = 0;
  firstCard = null;
  lockBoard = false;

  renderGrid();
}

function shuffle(array) {
  array.sort(() => 0.5 - Math.random());
}

function renderGrid() {
  gridEl.innerHTML = "";
  gameCards.forEach((card, index) => {
    const cell = document.createElement("div");
    cell.className = "cell";
    const img = document.createElement("img");
    img.src = card.img;
    img.alt = card.name;
    img.dataset.index = index;
    img.style.opacity = "0"; // start hidden
    cell.appendChild(img);
    cell.onclick = () => flipCard(index);
    gridEl.appendChild(cell);
  });
}

function flipCard(index) {
  if (lockBoard) return;

  const cellImg = gridEl.children[index].querySelector("img");
  cellImg.style.opacity = "1";

  if (!firstCard) {
    firstCard = index;
    return;
  }

  const secondCard = index;

  if (gameCards[firstCard].name === gameCards[secondCard].name && firstCard !== secondCard) {
    matches++;
    firstCard = null;
    if (matches === cards.length) win();
  } else {
    lockBoard = true;
    setTimeout(() => {
      gridEl.children[firstCard].querySelector("img").style.opacity = "0";
      gridEl.children[secondCard].querySelector("img").style.opacity = "0";
      firstCard = null;
      lockBoard = false;
    }, 1000);
  }
}

function win() {
  gameScreen.classList.remove("active");
  endScreen.classList.add("active");
  endTitle.innerText = "YOU WIN 🎉";
}

function goMenu() {
  endScreen.classList.remove("active");
  startScreen.classList.add("active");
}
