'use strict';

var allProducts = [];

var options = document.getElementById('products');
var imgA = document.getElementById('producta');
var imgB = document.getElementById('productb');
var imgC = document.getElementById('productc');

var randomize = [0, 0, 0];
var pastRandomize = [0, 0, 0];

var userClicks = 0;
//Product Constructor function
function Product(name, title) {
    this.title = title;
    this.filepath = `img/${name}.jpg`;
    this.views = 0;
    this.clicks = 0;
    allProducts.push(this);
}

//Create all product objects
var productFiles = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];
var productTitles = ['R2D2 Luggage', 'Banana Slicer', 'Bathroom Tablet Stand', 'Useless Rainboots', 'All-in-one Breakfast Maker', 'Meatball Bubblegum', 'Uncomfortable Chair', 'Cthulhu Action Figure', 'Doggy Duck-beak', 'Dragon Meat', 'Pen utensils', 'Puppy Sweeper Sweater', 'Pizza Scissors', 'Shark Attack Bed', 'Baby Sweeper Sweater', 'Tauntaun Belly Sleeping Bag', 'Unicorn Meat', 'Tentacle USB Drive', 'Wrong Watering Can', 'Impossible Wine Glass'];

for (var i = 0; i < productFiles.length; i++) {
    new Product(productFiles[i], productTitles[i]);
}

//Render random 3 images
function verifyRandoms() {
    while (randomize[0] === pastRandomize[0] || randomize[0] === pastRandomize[1] || randomize[0] === pastRandomize[2]) {
        randomize[0] = Math.floor(Math.random() * allProducts.length);
    }
    while (randomize[1] === randomize[0] || randomize[1] === pastRandomize[0] || randomize[1] === pastRandomize[1] || randomize[1] === pastRandomize[2]) {
        randomize[1] = Math.floor(Math.random() * allProducts.length);
    }
    while (randomize[2] === randomize[0] || randomize[2] === randomize[1] || randomize[2] === pastRandomize[0] || randomize[2] === pastRandomize[1] || randomize[2] === pastRandomize[2]) {
        randomize[2] = Math.floor(Math.random() * allProducts.length);
    }
    // console.log('index numbers:', randomize[0], randomize[1], randomize[2]);

    pastRandomize[0] = randomize[0];
    pastRandomize[1] = randomize[1];
    pastRandomize[2] = randomize[2];
}

function renderProducts() {
    imgA.src = allProducts[randomize[0]].filepath;
    imgA.alt = allProducts[randomize[0]].title;
    imgA.title = allProducts[randomize[0]].title;
    allProducts[randomize[0]].views++;

    imgB.src = allProducts[randomize[1]].filepath;
    imgB.alt = allProducts[randomize[1]].title;
    imgB.title = allProducts[randomize[1]].title;
    allProducts[randomize[1]].views++;

    imgC.src = allProducts[randomize[2]].filepath;
    imgC.alt = allProducts[randomize[2]].title;
    imgC.title = allProducts[randomize[2]].title;
    allProducts[randomize[2]].views++;
}

//on page load:
verifyRandoms();
renderProducts();

//when user clicks
options.addEventListener('click', handleClick);

function handleClick(event) {
    var clickPic = false;
    for (var i = 0; i < allProducts.length; i++) {
        if (event.target.title === allProducts[i].title) {
            allProducts[i].clicks++;
            userClicks++;
            clickPic = true;
            console.log(event.target.title);
        }
    }
    if (clickPic === false) {
        return alert('Please click on one of the products.');
    }
    if (userClicks === 25) {
        console.table(allProducts);
        options.removeEventListener('click', handleClick);

        for (var i = 0; i < allProducts.length; i++) {
            var ulEl = document.getElementById('results');
            var liEl = document.createElement('li');
            liEl.textContent = `${allProducts[i].clicks} votes for the ${allProducts[i].title}`;
            ulEl.appendChild(liEl);
        }
        userClicks = 0;
    }
    verifyRandoms();
    renderProducts();
}