import { renderWorld } from "./render.js";
import { Ball } from "./ball.js";
import { physicsWorld } from "./physics.js";
import { CONFIG } from "./config.js";

const canvas = document.querySelector("canvas");

resizeCanvas();

const render = new renderWorld(canvas);
const world = new physicsWorld(canvas.width, canvas.height);

function resizeCanvas(){
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height; 
}

function CreateBalls(){
    for (let i = 0; i < CONFIG.ballNumber; i++) {
        world.addBall(new Ball(
            Math.random()*(canvas.width - 2*CONFIG.radius) + CONFIG.radius,
            Math.random()*(canvas.height - 2*CONFIG.radius) + CONFIG.radius,
            CONFIG.radius,
            CONFIG.speed,
            Math.random()*360,
            `rgb(
                        ${Math.random()*255},
                        ${Math.random()*255},
                        ${Math.random()*255}
                    )`
        ));
    }
}
CreateBalls();

let KE = 0;
function animate(){
    KE = world.update(KE);
    render.render(world);
    requestAnimationFrame(animate);
}
animate();