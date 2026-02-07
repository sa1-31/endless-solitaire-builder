const gridEl = document.getElementById("grid");
const startScreen = document.getElementById("startScreen");
const gameScreen = document.getElementById("gameScreen");
const endScreen = document.getElementById("endScreen");
const endTitle = document.getElementById("endTitle");

let grid = [];

const types = [
  { name: "code", img: "assets/code.png" },
  { name: "docs", img: "assets/docs.png" },
  { name: "bug", img: "assets/bug.png" },
  { name: "feature", img: "assets/feature.png" }
];

function startGame() {
  startScreen.classList.remove("active");
  endScreen.classList.remove("active");
  gameScreen.classList.add("active");

  grid = [];
  gridEl.innerHTML = "";

  for (let i = 0; i < 25; i++) {
    const type = types[Math.floor(Math.random() * types.length)];
    grid.push(type);
  }

  renderGrid();
}

function renderGrid() {
  gridEl.innerHTML = "";
  grid.forEach((type, index) => {
    const cell = document.createElement("div");
    cell.className = `cell ${type.name}`;

    const img = document.createElement("img");
    img.src = type.img;
    img.alt = type.name;
    cell.appendChild(img);

    cell.onclick = () => handleClick(index);
    gridEl.appendChild(cell);
  });
}

function handleClick(index) {
  const card = grid[index];
  
  if (card.name === "bug") {
    lose();
  }

  if (card.name === "feature") {
    const neighbors = getNeighbors(index);
    const neighborNames = neighbors.map(n => n.name);
    if (neighborNames.includes("code") && neighborNames.includes("docs")) {
      grid[index] = types[0]; // feature transforms to code after completion
      checkWin();
      renderGrid();
    }
  }
}

function getNeighbors(i) {
  const n = [];
  const row = Math.floor(i / 5);
  const col = i % 5;

  const dirs = [
    [-1,0],[1,0],[0,-1],[0,1]
  ];

  dirs.forEach(d => {
    const r = row + d[0];
    const c = col + d[1];
    if (r >= 0 && r < 5 && c >= 0 && c < 5) {
      n.push(grid[r * 5 + c]);
    }
  });
  return n;
}

function checkWin() {
  if (!grid.some(card => card.name === "feature")) {
    win();
  }
}

function win() {
  gameScreen.classList.remove("active");
  endScreen.classList.add("active");
  endTitle.innerText = "YOU WIN 🎉";
}

function lose() {
  gameScreen.classList.remove("active");
  endScreen.classList.add("active");
  endTitle.innerText = "YOU LOSE 💀";
}

function goMenu() {
  endScreen.classList.remove("active");
  startScreen.classList.add("active");
}
