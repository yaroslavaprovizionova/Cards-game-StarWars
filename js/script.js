let cardsField = document.querySelector("#cards");
let resetBlock = document.querySelector("#reset");
let resetBtn = document.querySelector("#reset-btn");

let countCards = 16;
let images = [];
let deletedCards = 0;
let selected = [];
let pause = false;

function generateArrayRandomNumber (min, max) {
  let totalNumbers = max - min + 1;
  let arrayTotalNumbers = [];
  let tempRandomNumber;

  while (totalNumbers--) {
    arrayTotalNumbers.push(totalNumbers + min);
  }

  while (arrayTotalNumbers.length) {
    tempRandomNumber = Math.round(Math.random() * (arrayTotalNumbers.length - 1));
    images.push(arrayTotalNumbers[tempRandomNumber]);
    arrayTotalNumbers.splice(tempRandomNumber, 1);
  }
  return images;
}

generateArrayRandomNumber(1, 8);
generateArrayRandomNumber(1, 8);

for (let i = 0; i < countCards; i++) {
  let li = document.createElement("li");
  li.id = i;

  cardsField.appendChild(li);
}

cardsField.onclick = function (event) {
  if (pause == false) {
    var element = event.target;

    if(element.tagName == "LI" && element.className != "active") {
      let img = images[element.id];
      selected.push(element);
      element.className = "active";
      element.style.backgroundImage = "url(images/" + img + ".png)";

      if (selected.length == 2) {
        pause = true;
        if (images[selected[0].id] == images[selected[1].id]) {
          selected[0].style.visibility = "hidden";
          selected[1].style.visibility = "hidden";
          deletedCards += 2;
        }

        setTimeout(refreshCards, 1000);
      }
    }
  }
  
}

function refreshCards() {

  for (let i=0; i < countCards; i++) {
    cardsField.children[i].className = "";
    cardsField.children[i].style.backgroundImage = 'url("images/back.png")';
  }

  if (deletedCards == countCards) {
    resetBlock.style.display = 'block';
  }

  selected = [];
  pause = false;
}

resetBlock.onclick = function() {
  location.reload();
}