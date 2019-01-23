'use strict';

var allProducts = [];

var options = document.getElementById('products');
var reset = document.getElementById('reset');
var imgA = document.getElementById('producta');
var imgB = document.getElementById('productb');
var imgC = document.getElementById('productc');

var randomize = [0, 0, 0, 0, 0, 0];
var productVotes = [];

var userClicks = 0;
//Product Constructor function
function Product(name, title) {
    this.title = title;
    this.name = name;
    this.filepath = `img/${name}.jpg`;
    this.views = 0;
    this.clicks = 0;
    allProducts.push(this);
    productVotes.push(this.clicks);
}

//Create all product objects
var productFiles = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];
var productTitles = ['R2D2 Luggage', 'Banana Slicer', 'Bathroom Tablet Stand', 'Useless Rainboots', 'All-in-one Breakfast Maker', 'Meatball Bubblegum', 'Uncomfortable Chair', 'Cthulhu Action Figure', 'Doggy Duck-beak', 'Dragon Meat', 'Pen utensils', 'Puppy Sweeper Sweater', 'Pizza Scissors', 'Shark Attack Bed', 'Baby Sweeper Sweater', 'Tauntaun Belly Sleeping Bag', 'Unicorn Meat', 'Tentacle USB Drive', 'Wrong Watering Can', 'Impossible Wine Glass'];


//Render random 3 images
function verifyRandoms() {
    for (var i = 0; i < 3; i++) {
        var random = Math.floor(Math.random() * allProducts.length);
        while (randomize.includes(random)) {
            random = Math.floor(Math.random() * allProducts.length);
        }
        randomize.unshift(random);
        randomize.pop();
    }
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

//event function for voting
function handleClick(event) {
    var clickPic = false;
    for (var i = 0; i < allProducts.length; i++) {
        if (event.target.title === allProducts[i].title) {
            allProducts[i].clicks++;
            productVotes[i]++;
            userClicks++;
            clickPic = true;
            console.log(event.target.title);
        }
    }
    if (clickPic === false) {
        return alert('Please click on one of the products.');
    }
    verifyRandoms();
    renderProducts();
    if (userClicks % 5 === 0) {
        console.table(allProducts);
        options.removeEventListener('click', handleClick);
        reset.addEventListener('click', newVoter);
        
        var ulEl = document.getElementById('results');
        ulEl.textContent = '';

        for (var i = 0; i < allProducts.length; i++) {
            var liEl = document.createElement('li');
            liEl.textContent = `${allProducts[i].clicks} votes for the ${allProducts[i].title}`;
            ulEl.appendChild(liEl);
        }
        userClicks = 0;
        
        //save data to local table
        localStorage.savedProducts = JSON.stringify(allProducts);
        localStorage.savedVotes = JSON.stringify(productVotes);

        //render data on a chart
        var ctx = document.getElementById('datachart').getContext('2d');
        var barGraph = new Chart(ctx, {
            type: 'bar',
            responsive: false,
            data: {
                labels: productTitles,
                datasets: [{
                    label: 'Votes',
                    data: productVotes,
                    backgroundColor: 'black',
                    borderColor: 'orange',
                    borderWidth: 2,
                    hoverBackgroundColor: 'darkgrey'
                }]
            },
            options: {
                legend: {
                    labels: {
                        fontColor: "white",
                        fontSize: 18
                    }
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            fontColor: "white",
                            fontSize: 10,
                            stepSize: 1,
                            beginAtZero: true
                        }
                    }],
                    xAxes: [{
                        ticks: {
                            fontColor: "white",
                            fontSize: 12,
                            autoSkip: false
                        }
                    }]
                }
            }
        });
        barGraph.update();
    }
}

function newVoter(event) {
    verifyRandoms();
    renderProducts();
    options.addEventListener('click', handleClick);
}


//on page load:
console.log(localStorage.length);
if(localStorage.length === 2) {
    var loadProducts = JSON.parse(localStorage.savedProducts);
    for (var i = 0; i < loadProducts.length; i++) {
        new Product(loadProducts[i].name, loadProducts[i].title);
        allProducts[i].views = loadProducts[i].views;
        allProducts[i].clicks = loadProducts[i].clicks;
    }
    productVotes = JSON.parse(localStorage.savedVotes);
} else {
    for (var i = 0; i < productFiles.length; i++) {
        new Product(productFiles[i], productTitles[i]);
    }
}
verifyRandoms();
renderProducts();

//when user clicks
options.addEventListener('click', handleClick);
