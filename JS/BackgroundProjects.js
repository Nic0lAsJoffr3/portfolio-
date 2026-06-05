const canvas = document.getElementById("Projects-Background")
const ctx = canvas.getContext("2d")
class star {
    constructor() {
        this.x = 0
        this.y = 0
        this.size = 0
        this.speedGrowing = 0
        this.isGrowing = true
        this.driftX = 0
        this.driftY = 0
        this.isStarted = false
    }
    start() {
        this.x = Math.floor(Math.random() * canvas.width)
        this.y = Math.floor(Math.random() * canvas.height)
        this.size = Math.random() * 1.5
        this.driftX = (Math.random() - 0.5) * 0.1;
        this.driftY = (Math.random() - 0.5) * 0.1;
        this.speedGrowing = (Math.random() * 30 + 1) / 2000
        this.isStarted = true
    }
    draw() {
        if (!this.isStarted) {
            this.start()
            return
        }

        if (this.isGrowing) {
            this.size += this.speedGrowing
            if (this.size >= 1.5) this.isGrowing = false
        }
        else {
            this.size -= this.speedGrowing
            if (this.size <= 0.1) this.isGrowing = true
        }

        this.x += this.driftX
        this.y += this.driftY

        if (this.y > canvas.height || this.y < 0 || this.x > canvas.width || this.x < 0) {
            this.start()
        }

        if (this.size > 0) {
            ctx.beginPath();
            ctx.fillStyle = "#FFFFFF"
            ctx.fillStyle = "#FFFFFF" + (Math.floor((this.size * 255) / 1.25)).toString(16)
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}

var stars = []
for (var i = 0; i < 500; i++) {
    stars.push(new star())
}

function loop() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (var i = 0; i < stars.length; i++) {
        stars[i].draw()
    }
    requestAnimationFrame(loop)
}
loop()