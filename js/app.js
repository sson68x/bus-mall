'use strict';

// ******** GLOBAAL VARIABLES **********

let products = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'water-can', 'wine-glass'];
let votingRounds = 25;
let productArray = [];
let previousIndexes = [];

// ********** DOM REFERENCES ***********

let imgContainer = document.getElementById('container')

let imgOne = document.getElementById('image-one');
let imgTwo = document.getElementById('image-two');
let imgThree = document.getElementById('image-three');

let resultsButton = document.getElementById('results-button');
// let resultsList = document.getElementById('results-list');

// ********** CANVAS ELEMENT FOR CHART *************

let ctx = document.getElementById('myChart').getContext('2d');


// *********** LOCAL STORAGE ************

let retrievedProducts = localStorage.getItem('product');
console.log(retrievedProducts);

let parsedProducts = JSON.parse(retrievedProducts);
console.log(parsedProducts);

// *********** CONSTRUCTOR ************

function Product(name, fileExtension = 'jpg') {
  this.productName = name;
  this.image = `img/${name}.${fileExtension}`;
  this.views = 0;
  this.clicks = 0;

  productArray.push(this);
}

// for (let i = 0; i < products.length; i++) {
//   if (products[i] === 'sweep') {
//     new Product('sweep', 'png');
//   } else {
//     new Product(`${products[i]}`);
//   }
// }

if (retrievedProducts) {
  productArray = parsedProducts;
} else {
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
}

// ********** HELPER FUNCTIONS ***********

function getRandomIndex() {
  return Math.floor(Math.random() * productArray.length);
}

function renderImgs() {

  while (previousIndexes.length < 6) {
    let imgIndex = getRandomIndex();
    if (!previousIndexes.includes(imgIndex)) {
      previousIndexes.push(imgIndex);
    }
  }

  if (previousIndexes.length === 6) {
    previousIndexes.splice(0, 3);
  }

  imgOne.src = productArray[previousIndexes[0]].image;
  imgOne.alt = productArray[previousIndexes[0]].productName;
  productArray[previousIndexes[0]].views++;

  imgTwo.src = productArray[previousIndexes[1]].image;
  imgTwo.alt = productArray[previousIndexes[1]].productName;
  productArray[previousIndexes[1]].views++;

  imgThree.src = productArray[previousIndexes[2]].image;
  imgThree.alt = productArray[previousIndexes[2]].productName;
  productArray[previousIndexes[2]].views++;

  // let productOneIndex = getRandomIndex();
  // let productTwoIndex = getRandomIndex();
  // let productThreeIndex = getRandomIndex();

  // while (productOneIndex === productTwoIndex) {
  //   productTwoIndex = getRandomIndex();
  // }

  // while (productOneIndex === productTwoIndex || productTwoIndex === productThreeIndex) {
  //   productThreeIndex = getRandomIndex();
  // }

  // imgOne.src = productArray[productOneIndex].image;
  // imgOne.alt = productArray[productOneIndex].productName;
  // productArray[productOneIndex].views++;

  // imgTwo.src = productArray[productTwoIndex].image;
  // imgTwo.alt = productArray[productTwoIndex].productName;
  // productArray[productTwoIndex].views++;


  // imgThree.src = productArray[productThreeIndex].image;
  // imgThree.alt = productArray[productThreeIndex].productName;
  // productArray[productThreeIndex].views++;
}
renderImgs();

//  ********** EVENT HANDLER ************

function handleClick(event) {
  let imgClicked = event.target.alt;

  for (let i = 0; i < productArray.length; i++) {
    if (imgClicked === productArray[i].productName) {
      productArray[i].clicks++;
    }
  }

  votingRounds--;
  if (votingRounds === 0) {
    imgContainer.removeEventListener('click', handleClick);

    let stringifiedProducts = JSON.stringify(productArray);
    localStorage.setItem('product', stringifiedProducts);
    return;
  }
  renderImgs();
}

function handleShowResults() {
  let productNames = [];
  let productVotes = [];
  let productViews = [];

  for (let i = 0; i < productArray.length; i++) {
    productNames.push(productArray[i].name);
    productVotes.push(productArray[i].clicks);
    productViews.push(productArray[i].views);
  }

  if (votingRounds === 0) {
    let myChartObj = {
      type: 'bar',
      data: {
        labels: products,
        datasets: [{
          label: '# of Votes',
          data: productVotes,
          backgroundColor: [
            '#e29578'
          ],
          borderColor: [
            '#e29578'
          ],
          borderWidth: 1
        },
        {
          label: '# of Views',
          data: productViews,
          backgroundColor: [
            '#006d77'
          ],
          borderColor: [
            '#006d77'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    };
  new Chart(ctx, myChartObj);
  }
}

imgContainer.addEventListener('click', handleClick);
resultsButton.addEventListener('click', handleShowResults);