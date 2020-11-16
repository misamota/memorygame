const gameContainer = document.getElementById("game");
let cardOne = null;
let cardTwo = null;
let cardsFlipped = 0;
let noClick = false;


const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

function shuffle(array) {
  let counter = array.length;

  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);

    counter--;

    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    const newDiv = document.createElement("div");
    newDiv.classList.add(color);
    newDiv.addEventListener("click", handleCardClick);
    gameContainer.append(newDiv);
  }
}
//resets cards
function resetCards(divName){
  var cardArray = divName.querySelectorAll('div')
  for(cards of cardArray){
    cards.style.backgroundColor= "";
    cards.classList.remove('flip');

  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  if(noClick) return;
  if(event.target.classList.contains('flip')) return;

  let selectedCard = event.target;
  selectedCard.style.backgroundColor = selectedCard.classList[0] 
  // check to see if the card has been matched/flipped so it doesn't go through the check
  if (cardOne === null) {
    cardOne = selectedCard;
    cardOne.classList.add('flip');
  }
  else if (cardTwo === null && !selectedCard.classList.contains('flip')){
    noClick=true;
    cardTwo = selectedCard;
    cardTwo.classList.add('flip');
    
    if (cardOne.className === cardTwo.className) {
      cardsFlipped += 2;
      console.log(cardsFlipped);
      cardOne = null;
      cardTwo = null;
      //makes sure someone can't click while also doing the alert if someone wins
      setTimeout(function(){
        noClick= false;
        // ends the game and resets the board if all cards have been
        if (cardsFlipped === COLORS.length){
          alert("You win!! press OK to reset.");
          resetCards(gameContainer); 
          cardsFlipped = 0;
        };
        
      },1000);
      
      
    } else {
      
      setTimeout(function(){
      cardOne.style.backgroundColor = '';
      cardTwo.style.backgroundColor = '';
      cardOne.classList.remove('flip');
      cardTwo.classList.remove('flip');
      cardOne = null;
      cardTwo = null; 
      noClick= false;
      } ,1000)

    }

  }

// you have to make it so the cards dont match indivdual vards

}




// when the DOM loads
createDivsForColors(shuffledColors);
