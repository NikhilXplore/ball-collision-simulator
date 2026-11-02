export class renderWorld{
    constructor(canvas){
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
    }

    clear(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    drawBall(ball){
        this.ctx.beginPath()
        this.ctx.arc(ball.Position.x, ball.Position.y, ball.radius, 0, Math.PI * 2)
        this.ctx.fillStyle = ball.color
        this.ctx.fill()
    }
    render(world){
        this.clear();
        for(const ball of world.balls){
            this.drawBall(ball);
        }
    }
}