import { renderWorld } from "./render.js";
import { Ball } from "./ball.js";
import { physicsWorld } from "./physics.js";
import { CONFIG } from "./config.js";



function initSimulator(){
    const canvas = document.querySelector("canvas");
    const speedControl = document.querySelector("#speed");
    const play = document.querySelector("#toggle-run");
    const reset = document.querySelector("#reset");
    const restitution = document.querySelector("#restitution");
    const addball = document.querySelector("#add-ball");
    const ballCountDisplay = document.querySelector("#stat-balls");
    const KEDisplay = document.querySelector("#stat-KE");
    const FPSDisplay = document.querySelector("#stat-fps");

    resizeCanvas();
    const render = new renderWorld(canvas);
    const world = new physicsWorld(canvas.width, canvas.height);


    let prevtime = null;
    let deltaTime = 0
    let simulation_speed = speedControl.value;
    let fps = 0;
    let interval = 1;
    let totalTime = 0;


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

    function updateUI(){
        ballCountDisplay.textContent = world.balls.length;
        KEDisplay.textContent = `${world.kineticEnergy()} J`;
        FPSDisplay.textContent = Math.round(fps);
    }
    
    function animate(Timestamp){
        if(prevtime == null) prevtime = Timestamp;
        deltaTime = (Timestamp - prevtime)/1000;        // Timestamp is in millisecond. convert it in seconds
        prevtime = Timestamp;
        const simulated_dt = deltaTime * simulation_speed;

        fps = 1/deltaTime;
        totalTime += deltaTime;

        world.update(simulated_dt);
        if(totalTime > interval){
            updateUI();
            totalTime = 0;
        }
        render.render(world);
        requestAnimationFrame(animate);
    }

    function EventListener(){
        speedControl.addEventListener("input", ()=>{
            simulation_speed = speedControl.value;
        })
        play.addEventListener("click", ()=>{
            if(play.innerHTML == "Pause"){
                simulation_speed = 0;
                play.innerHTML = "Play";
            }else{
                simulation_speed = speedControl.value;
                play.innerHTML = "Pause";
            }
        })
        reset.addEventListener("click", ()=>{
            world.resetWorld();
            CreateBalls();
            simulation_speed = 0;
            play.innerHTML = "Play";
        })
        restitution.addEventListener("input", ()=>{
            world.e = Number(restitution.value);
        })
        addball.addEventListener("click", ()=>{
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
        })
    }
    EventListener();
    CreateBalls();
    requestAnimationFrame(animate);
}

window.addEventListener("DOMContentLoaded", initSimulator);