const game = {
    petName: null,
    hunger: 100,
    energy: 100,
    attention: 100,
    age: 0,
    clock: null,
    ageInterval: null,

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