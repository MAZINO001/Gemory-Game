const cards = document.querySelectorAll(".card");
let score = 0;
let matchCard = 0;
let cardOne, cardTwo;
let disableDeck = false;

function flipCard(e) {
  // Get the clicked card
  let clickedCard = e.target;

  if (clickedCard !== cardOne && !disableDeck) {
    clickedCard.classList.add("flip");

    if (!cardOne) {
      cardOne = clickedCard;
      return;
    }

    cardTwo = clickedCard;
    disableDeck = true;
    let cardOneImg = cardOne.querySelector("img").src;
    let cardTwoImg = cardTwo.querySelector("img").src;
    matchCards(cardOneImg, cardTwoImg);
  }
}

function matchCards(img1, img2) {
  // If two cards have matching images
  if (img1 === img2) {
    matchCard++; // Increment match value by 1
    if (matchCard === 8) {
      setTimeout(() => {
        shuffleCards();
      }, 1000);
      // Calling shuffle function after 1s
    }
    score += 12.5;
    updateScore();
    cardOne.removeEventListener("click", flipCard);
    cardTwo.removeEventListener("click", flipCard);
    cardOne = cardTwo = ""; // Setting both cards to blank
    disableDeck = false;
    return;
  }

  // If two cards do not match
  setTimeout(() => {
    // Add shake class to both cards after 400ms
    cardOne.classList.add("shake");
    cardTwo.classList.add("shake");
  }, 400);

  setTimeout(() => {
    // Remove shake class and flip class from both cards after 1.2s
    cardOne.classList.remove("shake", "flip");
    cardTwo.classList.remove("shake", "flip");
    cardOne = cardTwo = ""; // Setting both cards to blank
    disableDeck = false;
  }, 1200);
}

function shuffleCards() {
  matchCard = 0;
  cardOne = cardTwo = "";
  disableDeck = false;
  // Creating an array of 16 items, each item repeated twice
  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
  arr.sort(() => (Math.random() > 0.5 ? 1 : -1)); // Sorting array items randomly

  // Removing flip class from all cards and assigning a random image to each card
  cards.forEach((card, index) => {
    card.classList.remove("flip");
    let imgTag = card.querySelector("img");
    imgTag.src = `images/img-${arr[index]}.png`;
    card.addEventListener("click", flipCard);
  });
}

shuffleCards();

cards.forEach((card) => {
  // Add click event listener to all cards

  card.addEventListener("click", flipCard);
});

// for score
function updateScore() {
  const scoreElement = document.getElementById("score"); // Replace "score" with the actual ID of your score display element
  scoreElement.textContent = score; // Update the text content of the score display element with the current score value
}

