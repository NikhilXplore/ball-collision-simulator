export class Ball{
    constructor(cx, cy, radius = 20, speed = 10, theta = 30, color = "red", mass = 1){
        this.x = cx;
        this.y = cy;
        this.radius = radius;
        this.speed = speed;
        this.theta = theta * Math.PI/180;
        this.color = color;
        this.mass = mass;
        this.dx = Math.cos(this.theta)*this.speed;
        this.dy = Math.sin(this.theta)*this.speed;
    }
}