//define the variables
window.onload = function() {
let hunger = 100;
let energy = 100;
let attention = 100;
let clock;

//reference to progress bars
const hungryBar = document.getElementById("hungryBar");
const energyBar = document.getElementById("sleepyBar");
const attentionBar = document.getElementById("loveyBar");
const body = document.body;

//starts the clock to continuously deplete stats
clock = setInterval(depleteStats, 1000);

//function to update the progress bars
function updateBars() {
    hungryBar.value = hunger;
    energyBar.value = energy;
    attentionBar.value = attention;
}

//function to deplete the bars
function depleteStats() {
    if (hunger > 0) hunger -= 5;
    if (energy > 0) energy -= 5;
    if (attention > 0) attention -= 5;
    updateBars();
//checking for end of game
    if (hunger === 0 || energy === 0 || attention === 0) {
        clearInterval(clock);
        document.getElementById("walkingDog").style.display = "none";
        document.getElementById("ghostDog").style.display = "block";
        body.classList.add('ghost-background');
        document.getElementById("title").textContent = "Your tamagotchi has passed away. Game over!";

        // alert("Your Tamagotchi has passed away. Game over!");
    }
}

//event listener for the feed button
document.getElementById("feedbtn").onclick = function () {
    if (hunger < 100) {
        hunger += 10;
        updateBars();
    }
};
//event listener for the sleep button
document.getElementById("sleepbtn").onclick = function () {
    if (energy < 100) {
        energy += 10;
        updateBars();
    }
};
//event listener for the love button
document.getElementById("lovebtn").onclick = function () {
    if (attention < 100) {
        attention += 10;
        updateBars();
    }
};
};