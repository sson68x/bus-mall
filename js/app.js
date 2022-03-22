'use strict';

// ******** GLOBAAL VARIABLES **********

let productArray = [];
let votingRounds = 25;

// ********** DOM REFERENCES ***********

let imgContainer = document.getElementById('container')

let imgOne = document.getElementById('image-one');
let imgTwo = document.getElementById('image-two');
let imgThree = document.getElementById('image-three');

let resultsButton = document.getElementById('results-button');
let resultsList = document.getElementById('results-list');

// ********** CONSTRUCTOR ************

function Product(name, fileExtension = 'jpg') {
  this.productName = name;
  this.image = `img/${name}.${fileExtension}`;
  this.views = 0;
  this.clicks = 0;

  productArray.push(this);
}

new Product('bag');
new Product('banana');
new Product('bathroom');
new Product('boots');
new Product('breakfast');
new Product('bubblegum');
new Product('chair');
new Product('cthulhu');
new Product('dog-duck');
new Product('dragon');
new Product('pen');
new Product('pet-sweep');
new Product('scissors');
new Product('shark');
new Product('sweep', 'png');
new Product('tauntaun');
new Product('unicorn');
new Product('water-can');
new Product('wine-glass');

// ********** HELPER FUNCTIONS ***********

function getRandomIndex() {
  return Math.floor(Math.random() * productArray.length);
}

function renderImgs() {

  let productOneIndex = getRandomIndex();
  let productTwoIndex = getRandomIndex();
  let productThreeIndex = getRandomIndex();

  while(productOneIndex === productTwoIndex) {
    productTwoIndex = getRandomIndex();
  }

  while(productOneIndex === productTwoIndex || productTwoIndex === productThreeIndex) {
    productThreeIndex = getRandomIndex();
  }

  imgOne.src = productArray[productOneIndex].image;
  imgOne.alt = productArray[productOneIndex].productName;
  productArray[productOneIndex].views++;

  imgTwo.src = productArray[productTwoIndex].image;
  imgTwo.alt = productArray[productTwoIndex].productName;
  productArray[productTwoIndex].views++;
  
  
  imgThree.src = productArray[productThreeIndex].image;
  imgThree.alt = productArray[productThreeIndex].productName;
  productArray[productThreeIndex].views++;
} 

renderImgs();

//  ********** EVENT HANDLER ************

function handleClick(event) {
  let imgClicked = event.target.alt;

  for(let i = 0; i < productArray.length; i++) {
    if(imgClicked === productArray[i].productName) {
      productArray[i].clicks++;
    }
  }

  votingRounds--;
  if(votingRounds === 0) {
    imgContainer.removeEventListener('click', handleClick);
    return;
  }
  renderImgs();
}

function handleShowResults() {
  if(votingRounds === 0) {
    for(let i = 0; i < productArray.length; i++) {
      let li = document.createElement('li');
      li.textContent = `${productArray[i].productName} was viewed ${productArray[i].views} times and clicked on ${productArray[i].clicks} times.`;
      resultsList.appendChild(li);
    }
  }
}

//  ************ EVENT LISTENERS *************

imgContainer.addEventListener('click', handleClick);
resultsButton.addEventListener('click', handleShowResults);