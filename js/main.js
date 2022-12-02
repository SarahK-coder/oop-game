class Player {
    constructor () {
        this.width = 10;
        this.height = 3;
        this.positionX = 50 - (this.width / 2);
        this.positionY = 0;
        this.movementAmount = 3;

        this.domElement = null;
        this.createDomElement();
    }

    createDomElement () {
        // 1. create element
        this.domElement = document.createElement("div");
        // 2. add content or modify (ex. innerHTML)
        this.domElement.id = "player";
        this.domElement.style.width = this.width + "vw";
        this.domElement.style.height = this.height + "vh";
        this.domElement.style.bottom = this.positionY + "vh";
        this.domElement.style.left = this.positionX + "vw";
        // 3. append to the dom: 'parentElm.appendChild()'
        const boardElm = document.getElementById("board");
        boardElm.appendChild(this.domElement);
    }

    moveLeft () {
        if (this.positionX < 3) {
            // stop moving
        } else {
            this.positionX = this.positionX - this.movementAmount;
            this.domElement.style.left = this.positionX + "vw";
        }
    }
    moveRight () {
        if (this.positionX > 88) {
           // stop moving
        } else {
            this.positionX = this.positionX + this.movementAmount;
            this.domElement.style.left = this.positionX + "vw";
        }
    }
}

class Obstacle {
    constructor () {
        this.width = 1;
        this.height = 2;
        this.positionX = Math.floor(Math.random() * (90 - 10 + 1) + 10);
        this.positionY = 100;
        this.movementAmount = Math.floor(Math.random() * (3 - 1 + 1) + 1);

        this.domElement = null;
        this.createDomElement();
    }

    createDomElement () {
        // 1. create element
        this.domElement = document.createElement("div");
        // 2. add content or modify (ex. innerHTML)
        this.domElement.className = "obstacle";
        this.domElement.style.width = this.width + "vw";
        this.domElement.style.height = this.height + "vh";
        this.domElement.style.bottom = this.positionY + "vh";
        this.domElement.style.left = this.positionX + "vw";
        // 3. append to the dom: 'parentElm.appendChild()'
        const boardElm = document.getElementById("board");
        boardElm.appendChild(this.domElement);
        //console.log(this.positionX);
    }
    
    moveDown (count) {
        //console.log("how many obstacles: " + count);
        if (this.positionY < -1) {
            // delete              
            //this.domElement.remove();
        } else {
            this.positionY = this.positionY - this.movementAmount;
            this.domElement.style.bottom = this.positionY + "vw";
        }
    }
}

const player = new Player();

document.addEventListener("keydown", (event) => {
    const key = event.key;
    if (event.key === "ArrowLeft") {
        player.moveLeft();
    } else if (key === "ArrowRight") {
        player.moveRight();
    }
});

const obstacles = []; // - where we store obstacles --> array
// random setInterval between 200 and 100
const setRandomInterval = Math.floor(Math.random() * (200 - 100 + 100) + 100);
//console.log(setRandomInterval);

// [x] refactor to use only one interval
let time = 0;
let count = 0;
setInterval(() => {
    // randomly produce obstacles
    time++;
    if (time % 5 === 0) {
        const newObstacle = new Obstacle();
        obstacles.push(newObstacle);
    }
    obstacles.forEach((obstacleInstance) => {
        // move current obstacle
        count++;
        obstacleInstance.moveDown(count);
        // detect if there's a collision between player and current obstacle --> player vs. obstacleInstance
        if (
            player.positionX < obstacleInstance.positionX + obstacleInstance.width &&
            player.positionX + player.width > obstacleInstance.positionX &&
            player.positionY < obstacleInstance.positionY + obstacleInstance.height &&
            player.height + player.positionY > obstacleInstance.positionY
        ) {
            console.log("collision detected!!");
            //location.href = 'gameover.html';
        }

        // remove obstacle from array
        if (obstacleInstance.positionY <= (0 - obstacleInstance.height)) {
            //console.log("remove obstacle @ position: " + obstacleInstance.positionY);
            obstacleInstance.domElement.style.backgroundColor = "#0099ff";
            obstacleInstance.domElement.remove();
            count--;
            console.log("how many obstacles in array: " + obstacles.length);
            //obstacles.shift(obstacleInstance); // remove obstacle from array but doesn't work when randomly creating obstacles at different times
            const index = obstacles.indexOf(obstacles.values());
            if (index > -1) { // only splice array when item is found
                obstacles.splice(index, 1); // 2nd parameter means remove one item only
            }
        }
    });
}, 100);
//}, setRandomInterval);