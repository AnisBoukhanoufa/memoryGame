const startGame: HTMLDivElement = <HTMLDivElement>(
  document.querySelector(".button")
);
const overlay: HTMLDivElement = <HTMLDivElement>(
  document.querySelector(".overlay")
);
const nameField: HTMLElement = <HTMLElement>(
  document.querySelector(".name-field")
);
const cards: NodeList = document.querySelectorAll(".card");

let yourName: string;

console.log(overlay);
if (startGame) {
  startGame.addEventListener("click", () => {
    document.body.removeChild(startGame);
    document.body.removeChild(overlay);
    yourName = <string>prompt("Enter Your Name!");
    if (yourName) {
      nameField.dataset.name = yourName;
    }
  });
}
/************************************************** */
//shuffle
let cardsArray = Array.from(cards);
let orderedRange = [...cardsArray.keys()];

function shuffle(array: number[]) {
  let currentIndex = array.length,
    randomIndex;

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
let j: number = randomRange.length;
for (let i: number = 0; i < j; i++) {
  (<HTMLElement>cardsArray[i]).style.order = randomRange[i].toString();
}
// cardsArray.forEach((element, index) => {
//   (<HTMLElement>element).style.order = randomRange[index].toString();
// });

/************************************************** */
const wrongTry: HTMLParagraphElement = <HTMLParagraphElement>(
  document.querySelector("p.wrong")
);

console.log(wrongTry);
let cardsTest: boolean = true;
let wrongtries: number = 0;
let goodTries: number = 0;
let firstCard: HTMLElement | undefined = undefined;
let secondCard: HTMLElement | undefined = undefined;
let isFlipped: boolean = true;

cards.forEach((element) => {
  element.addEventListener("click", (event) => {
    if (testIsFlipped(event.currentTarget as HTMLElement))
      turnCard(event, testImg, gameFinished);
  });
});

function testIsFlipped(e: HTMLElement): boolean {
  e.classList.forEach((element) => {
    if (element === "is-flipped") {
      isFlipped = true;
    } else {
      isFlipped = false;
    }
  });
  if (isFlipped) {
    return false;
  } else return true;
}

function turnCard(event: Event, func: Function, func2: Function) {
  if (cardsTest) {
    firstCard = event.currentTarget as HTMLElement;

    (event.currentTarget as HTMLElement).classList.add("is-flipped");
    cardsTest = false;
  } else {
    (event.currentTarget as HTMLElement).classList.add("is-flipped");
    secondCard = event.currentTarget as HTMLElement;
    console.log(firstCard);
    console.log(secondCard);
    noClicking();
    func(firstCard, secondCard);
    func2(goodTries);
    cardsTest = true;
  }
}
const cardsContainer: HTMLElement = <HTMLElement>document.querySelector(".cards-container");
// console.log(cardsContainer)
function noClicking() {
    cardsContainer.classList.add("no-click");
    setTimeout(()=>{
        cardsContainer.classList.remove("no-click"); 
    },1000)
}

function testImg(one: HTMLElement, two: HTMLElement) {
  if (one.dataset.technology !== two.dataset.technology) {
    setTimeout(() => {
      one.classList.remove("is-flipped");
      two.classList.remove("is-flipped");
    }, 1000);
    wrongtries++;
    wrongTry.dataset.try = wrongtries.toString();
  } else {
    goodTries++;
  }
}

function gameFinished(good: number) {
  if (good === 10) {
    const gameOver: HTMLElement = document.createElement("p");
    // gameOver.classList.add("overlay");
    gameOver.classList.add("winner");
    const textNode = document.createTextNode("Congratulation You Win!!");
    gameOver.append(textNode);
    document.body.append(gameOver);
  }
}
