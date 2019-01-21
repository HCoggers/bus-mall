'use strict';

var allProducts = [];
var productA = document.getElementById('producta');
var productB = document.getElementById('productb');
var productC = document.getElementById('productc');

//Product Constructor function
function Product(name) {
    this.title = name;
    this.filepath = `img/${name}.jpg`;
    this.views = 0;
    this.clicks = 0;
    allProducts.push(this);
}

//Create all product objects
var productNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];
for (var i = 0; i < (productNames.length - 1); i++) {
    new Product(productNames[i]);
}

//Render random 3 images
function renderProducts() {
    var randomA = Math.floor(Math.random() * allProducts.length);
    var randomB = Math.floor(Math.random() * allProducts.length);
    var randomC = Math.floor(Math.random() * allProducts.length);
    while (randomB === randomA) {
        randomB = Math.floor(Math.random() * allProducts.length);
    }
    while (randomC === randomA || randomC === randomB) {
        randomC = Math.floor(Math.random() * allProducts.length);
    }
    console.log('index numbers:', randomA, randomB, randomC);

    productA.src = allProducts[randomA].filepath;
    productA.alt = allProducts[randomA].name;
    productA.title = allProducts[randomA].name;
    allProducts[randomA].views++;

    productB.src = allProducts[randomB].filepath;
    productB.alt = allProducts[randomB].name;
    productB.title = allProducts[randomB].name;
    allProducts[randomB].views++;

    productC.src = allProducts[randomC].filepath;
    productC.alt = allProducts[randomC].name;
    productC.title = allProducts[randomC].name;
    allProducts[randomC].views++;
}

renderProducts();