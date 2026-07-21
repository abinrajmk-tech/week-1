const count = document.querySelector("#count");
let id;
function countCallBack() {
    const target = 100;
    const duration = 10000;
    let start = null;
    function animateCount(now) {
        if (!start) start = now;
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const rate = easeOutCubic(progress);
        const value = Math.floor(rate * target);
        count.textContent = value;

        if (progress < 1) requestAnimationFrame(animateCount);
    }
    requestAnimationFrame(animateCount);
}
const countObserver = new IntersectionObserver(countCallBack, {});
countObserver.observe(count);

function easeOutCubic(x) {
    return 1 - Math.pow(1 - x, 3);
}
class Particle {
    colors = ["orange", "white", "blue", "yellow", "green", "brown"];
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 10 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color =
            this.colors[Math.floor(Math.random() * this.colors.length)];
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
    }
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 1, Math.PI * 2);
        ctx.fill();
    }
}
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
let particlesArray = [];

const dpr = window.devicePixelRatio || 1;
const rect = canvas.getBoundingClientRect();
canvas.width = rect.width * dpr;
canvas.height = rect.height * dpr;
ctx.scale(dpr, dpr);

for (let i = 0; i < 100; i++) {
    particlesArray[i] = new Particle(
        Math.random() * canvas.width,
        Math.random() * canvas.height
    );
}

function animateParticle() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw(ctx);
    }
    id = requestAnimationFrame(animateParticle);
}
animateParticle();
function pauseAnimation() {
    cancelAnimationFrame(id);
}
function resumeAnimation() {
    animateParticle();
}
