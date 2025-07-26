const words = [
    "apple", "banana", "grape", "orange", "peach", "lemon", "mango", "kiwi", "melon", "berry",
    "house", "chair", "table", "couch", "shelf", "window", "mirror", "lamp", "rug", "curtain",
    "cat", "dog", "mouse", "horse", "sheep", "goat", "zebra", "tiger", "lion", "monkey",
    "river", "mountain", "desert", "ocean", "island", "forest", "valley", "hill", "beach", "cliff",
    "bread", "cheese", "butter", "pasta", "pizza", "salad", "steak", "chicken", "bacon", "egg",
    "cloud", "rain", "storm", "snow", "wind", "sun", "fog", "thunder", "lightning", "breeze",
    "red", "blue", "green", "yellow", "black", "white", "purple", "orange", "pink", "brown",
    "school", "pencil", "paper", "book", "chalk", "eraser", "teacher", "student", "desk", "board",
    "happy", "sad", "angry", "tired", "excited", "bored", "nervous", "brave", "calm", "scared",
    "car", "truck", "bus", "train", "plane", "boat", "bike", "scooter", "van", "ship"
];

const wordEl = document.querySelector(".word");
const charactersEl = document.querySelector(".characters");
const messageEl = document.getElementById("message");
const wrongAnswersCountEl = document.getElementById("wrong-count");
const playAgainBtn = document.getElementById("play-again");

const MAX_WRONG_ANSWERS_COUNT = 6;

let currentWord;
let wrongAnswers;
let gameFinished;


function getRandomWord(words) {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
}

function getCharIndices(word, char) {
    const indices = [];

    for (let i = 0; i < word.length; i++) {
        if (word[i] === char) {
            indices.push(i);
        }
    }

    return indices;
}

function updateWrongAnswersCount(count) {
    wrongAnswersCountEl.textContent = count 
}

function showWord(word) {
    const charSlots = wordEl.querySelectorAll(":scope > *");

    for (let i = 0; i < word.length; i++) {
        charSlots[i].textContent = word[i];
    }
}

function checkWinning() {
    const charSlots = wordEl.querySelectorAll(":scope > *");

    const isWin = [...charSlots].every((slot) => slot.textContent !== "");

    if (isWin) {
        gameFinished = true;
        messageEl.textContent = "YOU WON!";
        messageEl.className = "win";
        showWord(currentWord);
    }

}

function setUpGame() {
    gameFinished = false;
    wrongAnswers = 0;
    currentWord = getRandomWord(words);

    updateWrongAnswersCount(wrongAnswers);
    messageEl.textContent = "";
    messageEl.className = "";

    wordEl.innerHTML = "";
    charactersEl.innerHTML = "";

    for (let i = 0; i < currentWord.length; i++) {
        const char = document.createElement("div");
        char.dataset.index = i;

        wordEl.appendChild(char);
    }

    for (let c = "a".charCodeAt(0); c <= "z".charCodeAt(0); c++) {
        const character = document.createElement("button");
        character.textContent = String.fromCharCode(c);

        charactersEl.appendChild(character);
    }
}

charactersEl.addEventListener("click", (e) => {
    if (e.target === charactersEl || gameFinished) return;

    const char = e.target.textContent;

    const charIndices = getCharIndices(currentWord, char);

    for (const index of charIndices) {
        const charSlot = wordEl.querySelector(`[data-index="${index}"]`);
        charSlot.textContent = char;
    }

    if (charIndices.length > 0) {
        e.target.className = "correct";
    }
    else {
        e.target.className = "incorrect";
        wrongAnswers++;
    }

    e.target.disabled = true;
    updateWrongAnswersCount(wrongAnswers);

    if (wrongAnswers === MAX_WRONG_ANSWERS_COUNT) {
        gameFinished = true;
        messageEl.textContent = "you lost :(";
        messageEl.className = "lose";
        showWord(currentWord);
    }
    else {
        checkWinning();
    }
});

playAgainBtn.addEventListener("click", setUpGame);



setUpGame();