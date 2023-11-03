import { Sitting, Running, Jumping, Falling } from "./playerStates.js";


export class Player {
    constructor(game) {
        this.game = game;
        // this.gameHeight = gameHeight - 20; //bejkfvkjs
        // this.gameWidth = gameWidth; //dsnv 
        this.width = 192;
        this.height = 192;
        this.x = 0;
        this.y = this.game.height - this.height - 2; //adjusted to lift up not at canvas end
        this.vy = 0;
        this.weight = 3;
        this.image = document.getElementById('player');
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame;
        this.fps = 15;
        this.frameInterval = 1000 / this.fps;
        this.frameTimer = 0;

        this.speed = 0;
        this.maxSpeed = 20;
        this.states = [new Sitting(this), new Running(this), new Jumping(this), new Falling(this)];
        this.currentState = this.states[0];
        this.currentState.enter();

    }
    update(input, deltaTime) {

        this.currentState.handleInput(input);
        //horizontal 
        this.x += this.speed;
        if (input.includes('ArrowRight') || input.includes('D')) this.speed = this.maxSpeed;
        else if (input.includes('ArrowLeft') || input.includes('A')) this.speed = -this.maxSpeed;
        else this.speed = 0;
        if (this.x < 0) this.x = 0;
        if (this.x > this.game.width - this.width - this.width) this.x = this.game.width - this.width - this.width;

        // vertical
        this.y += this.vy;
        if (!this.onGround()) this.vy += this.weight;
        else this.vy = 0;

        //sprite animation
        if (this.frameTimer > this.frameInterval) {
            this.frameTimer = 0;
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = 0;
        } else {
            this.frameTimer += deltaTime;
        }






    };
    draw(context) {
        // context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y + 50, this.width, this.height);
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y - 250, this.width * 2.5, this.height * 2.5); //add to this.y for not on canvas end
    };
    onGround() {
        return this.y >= this.game.height - this.height; //adjusted / fixed because of adjusted y manually

    };
    setState(state, speed) {
        this.currentState = this.states[state];
        this.game.speed = this.game.maxSpeed * speed;
        console.log(this.maxSpeed)
        this.currentState.enter();
    }

}