"use strict";
const startGame = (document.querySelector(".button"));
const overlay = (document.querySelector(".overlay"));
const nameField = (document.querySelector(".name-field"));
const cards = document.querySelectorAll(".card");
let yourName;
console.log(overlay);
if (startGame) {
    startGame.addEventListener("click", () => {
        document.body.removeChild(startGame);
        document.body.removeChild(overlay);
        yourName = prompt("Enter Your Name!");
        if (yourName) {
            nameField.dataset.name = yourName;
        }
    });
}
/************************************************** */
//shuffle
let cardsArray = Array.from(cards);
let orderedRange = [...cardsArray.keys()];
function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex > 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ];
    }
    return array;
}
let randomRange = shuffle(orderedRange);
let j = randomRange.length;
for (let i = 0; i < j; i++) {
    cardsArray[i].style.order = randomRange[i].toString();
}
// cardsArray.forEach((element, index) => {
//   (<HTMLElement>element).style.order = randomRange[index].toString();
// });
/************************************************** */
const wrongTry = (document.querySelector("p.wrong"));
console.log(wrongTry);
let cardsTest = true;
let wrongtries = 0;
let goodTries = 0;
let firstCard = undefined;
let secondCard = undefined;
let isFlipped = true;
cards.forEach((element) => {
    element.addEventListener("click", (event) => {
        if (testIsFlipped(event.currentTarget))
            turnCard(event, testImg, gameFinished);
    });
});
function testIsFlipped(e) {
    e.classList.forEach((element) => {
        if (element === "is-flipped") {
            isFlipped = true;
        }
        else {
            isFlipped = false;
        }
    });
    if (isFlipped) {
        return false;
    }
    else
        return true;
}
function turnCard(event, func, func2) {
    if (cardsTest) {
        firstCard = event.currentTarget;
        event.currentTarget.classList.add("is-flipped");
        cardsTest = false;
    }
    else {
        event.currentTarget.classList.add("is-flipped");
        secondCard = event.currentTarget;
        console.log(firstCard);
        console.log(secondCard);
        noClicking();
        func(firstCard, secondCard);
        func2(goodTries);
        cardsTest = true;
    }
}
const cardsContainer = document.querySelector(".cards-container");
// console.log(cardsContainer)
function noClicking() {
    cardsContainer.classList.add("no-click");
    setTimeout(() => {
        cardsContainer.classList.remove("no-click");
    }, 1000);
}
function testImg(one, two) {
    if (one.dataset.technology !== two.dataset.technology) {
        setTimeout(() => {
            one.classList.remove("is-flipped");
            two.classList.remove("is-flipped");
        }, 1000);
        wrongtries++;
        wrongTry.dataset.try = wrongtries.toString();
    }
    else {
        goodTries++;
    }
}
function gameFinished(good) {
    if (good === 10) {
        const gameOver = document.createElement("p");
        // gameOver.classList.add("overlay");
        gameOver.classList.add("winner");
        const textNode = document.createTextNode("Congratulation You Win!!");
        gameOver.append(textNode);
        document.body.append(gameOver);
    }
}
//# sourceMappingURL=main.js.map