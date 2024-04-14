document.addEventListener("DOMContentLoaded", function () {
    const startButton = document.querySelector(".start");
    const gameSection = document.querySelector(".game");
    const wordDisplay = document.querySelector(".word");
    const keyboard = document.querySelectorAll(".keyboard button");
    const graphicItems = document.querySelectorAll(".graphic .item");
    const startPage = document.querySelector(".start-page"); 

    const words = ["monkey", "elephant", "butterfly", "leopard", "giraffe"];
    let selectedWord = "";
    let guessedWord = "";
    let lives = 6;

    function initGame() {
        selectedWord = words[Math.floor(Math.random() * words.length)];
        guessedWord = Array(selectedWord.length).fill("_").join("");
        lives = 6;
        updateDisplay();
    }

    function updateDisplay() {
        wordDisplay.textContent = guessedWord;
        graphicItems.forEach((item, index) => {
            if (index < lives) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
        });
    }

    function checkLetter(letter) {
        let found = false;
        let newGuessedWord = "";
        for (let i = 0; i < selectedWord.length; i++) {
            if (selectedWord[i] === letter) {
                newGuessedWord += letter;
                found = true;
            } else {
                newGuessedWord += guessedWord[i];
            }
        }
        guessedWord = newGuessedWord;
        if (!found) {
            lives--;
        }
        updateDisplay();
        checkGameStatus();
    }

    function checkGameStatus() {
        if (guessedWord === selectedWord) {
            alert("Congratulations! You won!");
            initGame();
        } else if (lives === 0) {
            alert("Game over! The word was: " + selectedWord);
            initGame();
        }
    }

    startButton.addEventListener("click", function () {
        gameSection.style.display = "block"; 
        this.style.display = "none"; 
        startPage.style.display = "none"; 
        initGame(); 
    });

   
    keyboard.forEach(button => {
        button.addEventListener("click", function () {
            if (gameSection.style.display === "block") {
                const letter = this.textContent;
                checkLetter(letter);
            }
        });
    });
});
