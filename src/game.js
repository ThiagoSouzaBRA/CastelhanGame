import { GameScene } from './Scenes/gameScene';
const setFPS = 60;
class Game {
    constructor() {
        this.currentScene = null;
        this.running = true;
    }

    start() {
        this.running = true;
        this.currentScene = new GameScene(window.innerWidth, window.innerHeight);
    }

    stop() {
        if (!this.running) return
        this.running = false;
        clearInterval()
    }

    update() {
        this.currentScene.update();
        this.currentScene.render();
    }

    isRunning() {
        return this.running;
    }
}


let game = new Game();
game.start();

setInterval(() => {
    if (!game.isRunning()) return;
    game.update()
}, 1000 / setFPS);





