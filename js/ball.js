export class Ball{
    constructor(cx, cy, radius = 20, speed = 1000, theta = 30, color = "red", mass = 1){
        this.Position = {x: cx, y: cy};
        this.radius = radius;
        this.theta = theta * Math.PI/180;
        this.speed = speed;
        this.velocity = {dx: Math.cos(this.theta)*this.speed, dy: Math.sin(this.theta)*this.speed}
        this.color = color;
        this.mass = mass;
    }
}