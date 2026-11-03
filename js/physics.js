export class physicsWorld {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.balls = [];
        this.dt = 1;
        this.e = 1;
    }

    addBall(ball) {
        this.balls.push(ball);
    }

    resetWorld(){
        this.balls.length = 0;
    }

    update(dt) {
        this.dt = dt;

        // Stage 1: Move all balls and resolve wall collisions
        for (const ball of this.balls) {
            this.#wallCollision(ball);
        }

        // Stage 2: Resolve ball-to-ball collisions
        for (let i = 0; i < this.balls.length; i++) {
            for (let j = i + 1; j < this.balls.length; j++) {

                const ball1 = this.balls[i];
                const ball2 = this.balls[j];

                if (this.#collisionDetection(ball1, ball2)) {
                    this.#ballcollisionResolver(ball1, ball2);
                }
            }
        }

    }
    kineticEnergy(){
        let KE = 0;

        for (const ball of this.balls) {
            const { dx, dy } = ball.velocity;

            KE += 0.5 * ball.mass * (dx * dx + dy * dy);
        }

        return Math.round(KE * 100)/100;
    }
    #collisionDetection(ball1, ball2) {
        if (Math.hypot((ball1.Position.x - ball2.Position.x), (ball1.Position.y - ball2.Position.y)) <= ball2.radius + ball1.radius) {
            return true;
        } else {
            return false;
        }
    }
    #wallCollision(ball) {
        ball.Position.x = (ball.Position.x + ball.velocity.dx*this.dt);
        ball.Position.y = (ball.Position.y + ball.velocity.dy*this.dt);

        if (ball.Position.x + ball.radius >= this.width) {
            ball.Position.x = this.width - ball.radius;
            ball.velocity.dx *= -1;
        } else if (ball.Position.x - ball.radius <= 0) {
            ball.Position.x = ball.radius;
            ball.velocity.dx *= -1;
        }
        if (ball.Position.y + ball.radius >= this.height) {
            ball.Position.y = this.height - ball.radius;
            ball.velocity.dy *= -1;
        } else if (ball.Position.y - ball.radius <= 0) {
            ball.Position.y = ball.radius;
            ball.velocity.dy *= -1;
        }
    }
    #ballcollisionResolver(ball1, ball2) {
        // distance between centers
        const dx = ball2.Position.x - ball1.Position.x;
        const dy = ball2.Position.y - ball1.Position.y
        const d = Math.hypot(dx, dy);
        if (d === 0) return;

        // find the normal collision vector. pointing from ball1 to ball2  n = (p2-p1)/d
        const n = {
            x: dx / d,
            y: dy / d
        }

        const overlap = ball1.radius + ball2.radius - d;
        const slop = 0.01
        const perct = 0.8
        const invmasssum = (1 / ball1.mass) + (1 / ball2.mass);
        const C = Math.max(overlap - slop, 0) * perct / invmasssum;

        ball1.Position.x -= C * (1 / ball1.mass) * n.x;
        ball1.Position.y -= C * (1 / ball1.mass) * n.y;
        ball2.Position.x += C * (1 / ball2.mass) * n.x;
        ball2.Position.y += C * (1 / ball2.mass) * n.y;


        // find relative velocity vrel = v2 - v1 with respect to ball1
        const vrel = { x: ball2.velocity.dx - ball1.velocity.dx, y: ball2.velocity.dy - ball1.velocity.dy }

        // relative velocity component along collision vector and perpendicular to it (vrn = vrel.n)
        const vrn = vrel.x * n.x + vrel.y * n.y;
        if (vrn >= 0) return;

        // calculate impulse magnitude.
        const j = (-1 * (1 + this.e) * vrn) / (1 / ball1.mass + 1 / ball2.mass);
        const Jvector = { x: j * n.x, y: j * n.y };

        // change velocities 
        ball1.velocity.dx -= Jvector.x / ball1.mass;
        ball1.velocity.dy -= Jvector.y / ball1.mass;

        ball2.velocity.dx += Jvector.x / ball2.mass;
        ball2.velocity.dy += Jvector.y / ball2.mass;
    }

}