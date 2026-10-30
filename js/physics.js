export class physicsWorld{
    constructor(width, height){
        this.width = width;
        this.height = height;
        this.balls = [];
    }

    addBall(ball){
        this.balls.push(ball);
    }

    update(){
        for(const ball of this.balls){
            this.updateBall(ball);
        }
    }

    updateBall(ball){
        ball.x = Math.floor(ball.x + ball.dx);
        ball.y = Math.floor(ball.y + ball.dy);

        if(ball.x + ball.radius >= this.width){
            ball.x = this.width - ball.radius;
            ball.dx *= -1;
        }else if(ball.x - ball.radius <= 0){
            ball.x = ball.radius;
            ball.dx *= -1;
        }
        if(ball.y + ball.radius >= this.height){
            ball.y = this.height - ball.radius;
            ball.dy *= -1;
        }else if(ball.y - ball.radius <= 0){
            ball.y = ball.radius;
            ball.dy *= -1;
        }
    }

}