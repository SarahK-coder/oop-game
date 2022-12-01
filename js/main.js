//console.log("js loaded");

class Player {
    constructor () {
        this.width = 10;
        this.height = 3;
        this.positionX = 50 - (this.width / 2);
        this.positionY = 0;
        this.movementAmount = 5;

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
        if (this.positionX < 5) {
            // stop moving
        } else {
            this.positionX = this.positionX - this.movementAmount;
            this.domElement.style.left = this.positionX + "vw";
        }
        console.log(this.positionX);
    }
    moveRight () {
        if (this.positionX > 85) {
           // stop moving
        } else {
            this.positionX = this.positionX + this.movementAmount;
            this.domElement.style.left = this.positionX + "vw";
        }
        //console.log(this.positionX);
    }
}

class Game {

}

const player = new Player();

//player.moveLeft();
//player.moveLeft();
//player.moveLeft();
//player.moveRight();
//player.moveRight();
//player.moveLeft();
//console.log('horizontal position:' + player.positionX);

document.addEventListener("keydown", (event) => {
    const key = event.key;
    //console.log(key);
    if (event.key === "ArrowLeft") {
        player.moveLeft();
    } else if (key === "ArrowRight") {
        player.moveRight();
    }
});