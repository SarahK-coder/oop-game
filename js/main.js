//console.log("js loaded");

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
        //console.log(this.positionX);
    }
    moveRight () {
        if (this.positionX > 88) {
           // stop moving
        } else {
            this.positionX = this.positionX + this.movementAmount;
            this.domElement.style.left = this.positionX + "vw";
        }
        //console.log(this.positionX);
    }
}

class Obstacle {
    constructor () {
        this.width = 1;
        this.height = 2;
        this.positionX = 50 - (this.width / 2);
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
        //this.domElement.style.left = this.positionX + "vw";
        this.domElement.style.left = Math.floor(Math.random() * (100 - 1 + 1) + 1) + "vw";
        // 3. append to the dom: 'parentElm.appendChild()'
        const boardElm = document.getElementById("board");
        boardElm.appendChild(this.domElement);
    }
    
    moveDown () {
        if (this.positionY < -3) {
            // delete
            this.domElement.remove();
        } else {
            this.positionY = this.positionY - this.movementAmount;
            this.domElement.style.bottom = this.positionY + "vw";
            //console.log(this.positionY);
        }
    }
}

const player = new Player();
const obstacles = []; // - where do we store obstacles --> array

document.addEventListener("keydown", (event) => {
    const key = event.key;
    //console.log(key);
    if (event.key === "ArrowLeft") {
        player.moveLeft();
    } else if (key === "ArrowRight") {
        player.moveRight();
    }
});

// random setInterval between 200 and 100
const setRandomInterval = Math.floor(Math.random() * (200 - 100 + 100) + 100);
//console.log(setRandomInterval);

// [x] 1. create multiple obstacles
// - how --> interval 1000ms
//setInterval(() => {
//    const newObstacle = new Obstacle();
//    obstacles.push(newObstacle);
//}, 1000);

// [x] 2. move all the obstacles
//setInterval(() => {
//    obstacles.forEach((obstacleInstant) => {
//        obstacleInstant.moveDown();
//    });
//}, setRandomInterval);

// 3. (bonus) refactor to use only one interval
let time = 0;
setInterval(() => {
    time++;
    if (time % 5 === 0) {
        const newObstacle = new Obstacle();
        obstacles.push(newObstacle);
    }
    obstacles.forEach((obstacleInstance) => {
        // move current obstacle
        obstacleInstance.moveDown();
        // detect if there's a collision between player and current obstacle --> player vs. obstacleInstance
        //detect if there's a collision between player and current obstacle
        if (
            player.positionX < obstacleInstance.positionX + obstacleInstance.width &&
            player.positionX + player.width > obstacleInstance.positionX &&
            player.positionY < obstacleInstance.positionY + obstacleInstance.height &&
            player.height + player.positionY > obstacleInstance.positionY
        ) {
            console.log("collision detected!!");
            //alert('collision!');
        }
    });
}, setRandomInterval);