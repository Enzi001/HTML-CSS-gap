const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let isjumping = false;
let jumpHeight = 0;
let score = 0;
let cactusX = canvas.width;
const dino = { x: 50, y: 150, width: 30, height: 30 };
function drawDino() {
  ctx.fillStyle = "green";
  ctx.fillRect(dino.x, dino.y - jumpHeight, dino.width, dino.height);
}
function drawCactus() {
  ctx.fillStyle = "brown";
  ctx.fillRect(cactusX, canvas.height - 30, 20, 30);
}
document.addEventListener("keydown", (e) => {
  if (e.code === "Space" && !isjumping) {
    isjumping = true;
    let jumpInterval = setInterval(() => {
      if (jumpHeight < 50) {
        jumpHeight += 5;
      } else {
        clearInterval(jumpInterval);
        let fallInterval = setInterval(() => {
          if (jumpHeight > 0) {
            jumpHeight -= 5;
          } else {
            clearInterval(fallInterval);
            isjumping = false;
          }
        }, 20);
      }
    }, 20);
  }
});

function moveCactus() {
  cactusX -= 5;
  if (cactusX < -20) {
    cactusX = canvas.width;
    score++;
  }
}

function checkCollsion() {
  if (
    cactusX < dino.x + dino.width &&
    cactusX + 20 > dino.x &&
    canvas.height - 30 < dino.y + dino.height - jumpHeight
  ) {
    alert("game over your score: " + score);
    document.location.reload();
  }
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawDino();
  drawCactus();
  moveCactus();
  checkCollsion();

  document.getElementById("score").textContent = `Score ${score}`;

  requestAnimationFrame(gameLoop);
}

gameLoop();
