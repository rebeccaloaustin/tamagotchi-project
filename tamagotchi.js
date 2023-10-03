const game = {
    petName: null,
    hunger: 100,
    energy: 100,
    attention: 100,
    age: 0,
    clock: null,
    ageInterval: null,
    lightsOn: true,

    startGame() {
        window.onload = () => {
            // Reference to progress bars
            this.hungryBar = document.getElementById("hungryBar");
            this.energyBar = document.getElementById("sleepyBar");
            this.attentionBar = document.getElementById("loveyBar");
            this.ageCounter = document.getElementById("ageDisplay");
            this.body = document.body;

            // Event listeners for buttons
            document.getElementById("feedbtn").onclick = () => this.feed();
            document.getElementById("sleepbtn").onclick = () => this.sleep();
            document.getElementById("lovebtn").onclick = () => this.love();
            document.getElementById("namebtn").onclick = () => this.nameTamagotchi();

            // Clocks to continuously deplete stats & increase age
            this.ageInterval = setInterval(() => this.increaseAge(), 5000);
            this.clock = setInterval(() => this.depleteStats(), 800);
        };
    },

    // Function to get tamagotchi name
    nameTamagotchi() {
        const petName = prompt("tamagotchi name");
        const nameDisplay = document.getElementById("name");
        nameDisplay.textContent = `name: ${petName}`;
        namebtn.style.display = "none";
    },

    // Function to increase age of tamagotchi
    increaseAge() {
        this.age++;
        this.ageCounter.textContent = this.age;
        if (this.age > 5) {
            document.getElementById("walkingDog").style.display = "none";
            document.getElementById("oldDog").style.display = "block";
            this.body.classList.add('old-background');
        }
    },

    // Function to update the progress bars
    updateBars() {
        this.hungryBar.value = this.hunger;
        this.energyBar.value = this.energy;
        this.attentionBar.value = this.attention;
    },

    // Function to deplete the bars
    depleteStats() {
        if (this.hunger > 0) this.hunger -= 5;
        if (this.energy > 0) this.energy -= 5;
        if (this.attention > 0) this.attention -= 5;
        this.updateBars();

        // Checking for the end of the game
        if (this.hunger === 0 || this.energy === 0 || this.attention === 0) {
            clearInterval(this.clock);
            clearInterval(this.ageInterval);
            document.getElementById("walkingDog").style.display = "none";
            document.getElementById("ghostDog").style.display = "block";
            document.getElementById("oldDog").style.display = "none";
            this.body.classList.remove('old-background');
            this.body.classList.add('ghost-background');
            document.getElementById("title").textContent = "Your tamagotchi has passed away. Game over!";
        }
    },
    //this lights button was a pain. Eventually would like for a separate dog image to appear when lights turn off. But, couldn't figure out.
    lightsBtn() {
        const body = document.body;
        const walkingDog = document.getElementById("walkingDog");
        const ghostDog = document.getElementById("ghostDog");
        const oldDog = document.getElementById("oldDog");

    // turn off the lights
        if (this.lightsOn) {   
            this.lightsOn = false;
            this.originalBackgroundColor = body.style.backgroundColor;
            body.style.backgroundColor = "grey";
            // store original images in a object
            this.originalImages = {
                walkingDog: walkingDog.style.display,
                ghostDog: ghostDog.style.display,
                oldDog: oldDog.style.display,
            };

            // hide all images when lights are off
            walkingDog.style.display = "none";
            ghostDog.style.display = "none";
            oldDog.style.display = "none";

    // turn on the lights
        } else {
            this.lightsOn = true;
            body.style.backgroundColor = this.originalBackgroundColor;

            // display original images
            walkingDog.style.display = this.originalImages.walkingDog;
            ghostDog.style.display = this.originalImages.ghostDog;
            oldDog.style.display = this.originalImages.oldDog;

        }
    },

    feed() {
        if (this.hunger < 100) {
            this.hunger += 10;
            this.updateBars();
        }
    },

    sleep() {
        if (this.energy < 100) {
            this.energy += 10;
            this.updateBars();
        }
    },

    love() {
        if (this.attention < 100) {
            this.attention += 10;
            this.updateBars();
        }
    }
};

// Start the game
game.startGame();