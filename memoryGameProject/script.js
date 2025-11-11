const cards = document.querySelectorAll('.card');
const restartBtn = document.getElementById('restartBtn');

let flippedCards = [];
let lockBoard = false;
function shuffleCards() {
  const gameBoard = document.getElementById('gameBoard');
  const shuffled = Array.from(cards).sort(() => Math.random() - 0.5);
  gameBoard.innerHTML = "";
  shuffled.forEach(card => gameBoard.appendChild(card));
}
shuffleCards();
cards.forEach(card => {
  card.addEventListener('click', () => {
    if (lockBoard || card.classList.contains('flipped') || card.classList.contains('matched')) return;

    card.classList.add('flipped');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
      checkMatch();
    }
  });
});
function checkMatch() {
  const [card1, card2] = flippedCards;
  const isMatch = card1.dataset.symbol === card2.dataset.symbol;

  if (isMatch) {
    card1.classList.add('matched');
    card2.classList.add('matched');
    flippedCards = [];
  } else {
    lockBoard = true;
    setTimeout(() => {
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
      flippedCards = [];
      lockBoard = false;
    }, 800);
  }
}
restartBtn.addEventListener('click', () => {
  cards.forEach(card => {
    card.classList.remove('flipped', 'matched');
  });
  flippedCards = [];
  lockBoard = false;
  shuffleCards();
});
