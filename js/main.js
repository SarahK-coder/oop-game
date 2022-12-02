class Game {
    constructor() {
        this.player = null;
        this.obstacles = []; //will hold instances of the class Obstacle
        this.time = 0;
        this.randomObstacleInterval = Math.floor(Math.random() * (200 - 100 + 1) + 100);
    }

    start() {

        this.player = new Player();
        this.attachEventListeners();

        // Create obstacles
        setInterval(() => {
            this.time++;
            if (this.time % 15 === 0) {
                const newObstacle = new Obstacle();
                this.obstacles.push(newObstacle);
            }
        }, this.randomObstacleInterval);


        //Update obstacles
        setInterval(() => {
            this.obstacles.forEach((obstacleInstance) => {

                //move current obstacle
                obstacleInstance.moveDown();

                //detect if there's a collision between player and current obstacle
                this.detectCollision(obstacleInstance);

                //check if we need to remove current obstacle
                this.removeObstacleIfOutside(obstacleInstance);
                
            });
        }, 50)
    }

    attachEventListeners() {
        document.addEventListener('keydown', (event) => {
            if (event.key === "ArrowRight") {
                this.player.moveRight();
            } else if (event.key === "ArrowLeft") {
                this.player.moveLeft();
            }
        });
    }

    detectCollision(obstacleInstance){
        if (
            this.player.positionX < obstacleInstance.positionX + obstacleInstance.width &&
            this.player.positionX + this.player.width > obstacleInstance.positionX &&
            this.player.positionY < obstacleInstance.positionY + obstacleInstance.height &&
            this.player.height + this.player.positionY > obstacleInstance.positionY
        ) {
            location.href = 'game-over.html'; // Player dies, Game Over
        }
    }

    removeObstacleIfOutside(obstacleInstance){
        if (obstacleInstance.positionY <= 0 - obstacleInstance.height) {
            obstacleInstance.domElement.remove(); // remove dom element
            for (let i=0; i < this.obstacles.length; i++){
                if(this.obstacles[i] === obstacleInstance) {
                    this.obstacles.splice(i, 1); // removes the instance at the index of the array
                    i--;
                }
            }
        }
    }
}

class Player {
    constructor() {
        this.sizeRatio = 1.5;
        this.width = 10;
        this.height = this.width * this.sizeRatio;
        this.positionX = 50 - (this.width / 2);
        this.positionY = 0;
        this.movementAmount = 3;

        this.domElement = null;
        this.createDomElement();
    }

    createDomElement() {
        // step1: create the element:
        this.domElement = document.createElement('div');

        // step2: add content or modify (ex. innerHTML...)
        this.domElement.id = "player";
        this.domElement.style.width = this.width + "vw";
        this.domElement.style.height = this.height + "vh";
        this.domElement.style.bottom = this.positionY + "vh";
        this.domElement.style.left = this.positionX + "vw";

        //step3: append to the dom: `parentElm.appendChild()`
        const boardElm = document.getElementById("board");
        boardElm.appendChild(this.domElement);
    }

    moveLeft() {
        if (this.positionX > 0) {
            this.positionX = this.positionX - this.movementAmount;
            this.domElement.style.left = this.positionX + "vw";
        }        
    }

    moveRight() {
        if (this.positionX < 88) {
            this.positionX = this.positionX + this.movementAmount;
            this.domElement.style.left = this.positionX + "vw";
        }
    }
}

class Obstacle {
    constructor() {
        this.width = 3;
        this.height = 3;
        this.positionX = Math.floor(Math.random() * (90 - 10 + 1) + 10);
        this.positionY = 100;
        this.movementAmount = Math.floor(Math.random() * (3 - 1 + 1) + 1);

        this.domElement = null;
        this.createDomElement();
    }
    createDomElement() {
        // step1: create the element:
        this.domElement = document.createElement('div');

        // step2: add content or modify (ex. innerHTML...)
        this.domElement.className = "obstacle";
        this.domElement.style.width = this.width + "vw";
        this.domElement.style.height = this.height + "vh";
        this.domElement.style.bottom = this.positionY + "vh";
        this.domElement.style.left = this.positionX + "vw";

        //step3: append to the dom: `parentElm.appendChild()`
        const boardElm = document.getElementById("board");
        boardElm.appendChild(this.domElement);
    }
    moveDown() {
        this.positionY = this.positionY - this.movementAmount;
        this.domElement.style.bottom = this.positionY + "vh";
    }
}

const game = new Game();
game.start();