const randIndex = function(lastIndex) {
    return Math.floor(Math.random() * (lastIndex + 1));
}

let allCards = [
    "&#127136;", "&#127137;", "&#127138;", "&#127139;", "&#127140;", "&#127141;",
    "&#127142;", "&#127143;", "&#127144;", "&#127145;", "&#127146;", "&#127147;",
    "&#127148;", "&#127149;", "&#127150;", "&#127153;", "&#127154;", "&#127155;",
    "&#127156;", "&#127157;", "&#127158;", "&#127159;", "&#127160;", "&#127161;",
    "&#127162;", "&#127163;", "&#127164;", "&#127165;", "&#127166;", "&#127167;",
    "&#127169;", "&#127170;", "&#127171;", "&#127172;", "&#127173;", "&#127174;",
    "&#127175;", "&#127176;", "&#127177;", "&#127178;", "&#127179;", "&#127180;",
    "&#127181;", "&#127182;", "&#127183;", "&#127185;", "&#127186;", "&#127187;",
    "&#127188;", "&#127189;", "&#127190;", "&#127191;", "&#127192;", "&#127193;",
    "&#127194;", "&#127195;", "&#127196;", "&#127197;", "&#127198;", "&#127199;"
];

let cardBack = allCards[0];
allCards.shift();

let gameDeck = [];
for (let i = 0; i < 8; i++) {
    let lastIndex = allCards.length - 1;
    let r = randIndex(lastIndex);
    gameDeck.push(allCards[r]);
    allCards.splice(r, 1);
}

gameDeck = gameDeck.concat(gameDeck);

// quick shuffle so pairs aren’t just 0-7 and 8-15
for (let i = gameDeck.length - 1; i > 0; i--) {
    let j = randIndex(i);
    let temp = gameDeck[i];
    gameDeck[i] = gameDeck[j];
    gameDeck[j] = temp;
}

let firstCardEl = null;
let firstCardIdx = null;
let lock = false;

let moves = 0;
let movesEl = document.createElement("div");
movesEl.id = "moves";
movesEl.innerHTML = "Moves: 0";
document.body.insertBefore(movesEl, document.getElementById("cardGrid"));

let handleClick = function(event) {
    if (lock) return;

    let cardEl = event.target;
    if (cardEl.classList.contains("matched")) return;
    if (cardEl === firstCardEl) return;

    let cardIdx = Number(cardEl.id.slice(5));
    cardEl.innerHTML = gameDeck[cardIdx];

    if (firstCardEl === null) {
        firstCardEl = cardEl;
        firstCardIdx = cardIdx;
        return;
    }

    moves += 1;
    movesEl.innerHTML = "Moves: " + moves;

    if (gameDeck[firstCardIdx] === gameDeck[cardIdx]) {
        firstCardEl.classList.add("matched");
        cardEl.classList.add("matched");
        firstCardEl = null;
        firstCardIdx = null;
    } else {
        lock = true;
        setTimeout(() => {
            firstCardEl.innerHTML = cardBack;
            cardEl.innerHTML = cardBack;
            firstCardEl = null;
            firstCardIdx = null;
            lock = false;
        }, 650);
    }
};

for (let i = 0; i < 16; i++) {
    document.querySelector("#card-" + i).onclick = handleClick;
}
