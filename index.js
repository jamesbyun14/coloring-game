// 캔버스 가져오고, resize 해결하기
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;
addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  gameTimer = 0;
  init();
});

// 'Circle' 클래스 만들기
class Circle {
  constructor(x, y, dx, dy, radius, color, deco) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
    this.deco = deco;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.strokeStyle = "black";
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
  }
  update() {
    this.draw();
    if (this.deco < 1) {
      if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
        this.dx = -this.dx;
      }

      if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
        this.dy = -this.dy;
      }
    }

    if (this.deco < 2) {
      this.x += this.dx;
      this.y += this.dy;
    } else if (this.deco === 2) {
      if (Keys.Space == true) {
        (this.x = canvas.width / 2), (this.y = canvas.height / 2);
      }
      this.x += ((Keys.KeyD - Keys.KeyA) * canvas.width) / 100;
      this.y += ((Keys.KeyS - Keys.KeyW) * canvas.width) / 100;
    } else if (this.deco === 3) {
      if (Keys.Enter == true) {
        (this.x = canvas.width / 2), (this.y = canvas.height / 2);
      }
      this.x += ((Keys.ArrowRight - Keys.ArrowLeft) * canvas.width) / 100;
      this.y += ((Keys.ArrowDown - Keys.ArrowUp) * canvas.width) / 100;
    }
  }
}

// 함수선언
getDistance = (x1, y1, x2, y2) => {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
};

countNums = () => {
  let blues = 0;
  let reds = 0;
  circleArray.forEach((circle) => {
    switch (circle.color) {
      case "#FFA07A":
        reds += 1;
        break;
      case "#87CEEB":
        blues += 1;
        break;
    }
  });
  return { redN: reds, blueN: blues };
};

let Keys = {
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
  ArrowUp: false,
  KeyA: false,
  KeyD: false,
  KeyS: false,
  KeyW: false,
  Space: false,
  Enter: false,
};
addEventListener("keydown", (e) => {
  switch (e.code) {
    case "KeyW":
      Keys.KeyW = true;
      break;
    case "KeyA":
      Keys.KeyA = true;
      break;
    case "KeyS":
      Keys.KeyS = true;
      break;
    case "KeyD":
      Keys.KeyD = true;
      break;
    case "ArrowUp":
      Keys.ArrowUp = true;
      break;
    case "ArrowLeft":
      Keys.ArrowLeft = true;
      break;
    case "ArrowDown":
      Keys.ArrowDown = true;
      break;
    case "ArrowRight":
      Keys.ArrowRight = true;
      break;
    case "Space":
      Keys.Space = true;
      break;
    case "Enter":
      Keys.Enter = true;
      break;
  }
});
addEventListener("keyup", (e) => {
  switch (e.code) {
    case "KeyW":
      Keys.KeyW = false;
      break;
    case "KeyA":
      Keys.KeyA = false;
      break;
    case "KeyS":
      Keys.KeyS = false;
      break;
    case "KeyD":
      Keys.KeyD = false;
      break;
    case "ArrowUp":
      Keys.ArrowUp = false;
      break;
    case "ArrowLeft":
      Keys.ArrowLeft = false;
      break;
    case "ArrowDown":
      Keys.ArrowDown = false;
      break;
    case "ArrowRight":
      Keys.ArrowRight = false;
      break;
    case "Space":
      Keys.Space = false;
      break;
    case "Enter":
      Keys.Enter = false;
      break;
  }
});

let circleArray;

const randXY = 100;
let midPoint = Math.sqrt(Math.pow(randXY, 2) * 2);

init = () => {
  circleArray = [];
  circleArray.push(
    new Circle(100, canvas.height / 2, null, null, 50, "red", 2)
  );
  circleArray.push(
    new Circle(canvas.width - 100, canvas.height / 2, null, null, 50, "blue", 3)
  );
  for (let i = 1; i < 200; i++) {
    let deco = Math.round(Math.random());

    circleArray.push(
      new Circle(
        Math.random() * 100 + canvas.width / 2 - midPoint / 3,
        Math.random() * 100 + canvas.height / 2 - midPoint / 2,
        deco == 0
          ? (Math.random() - 0.5) * 5
          : Math.round(Math.random()) == 1
          ? 10
          : -10,
        deco == 0
          ? (Math.random() - 0.5) * 5
          : Math.round(Math.random()) == 1
          ? 10
          : -10,
        20,
        deco == 0
          ? "white"
          : Math.round(Math.random()) == 1
          ? "#FFA07A"
          : "#87CEEB",
        deco
      )
    );
  }
};

// Game Loop

let gameTimer = 0;
const endTime = 3000;
let animationId;
//let winner = "blue";
animate = () => {
  animationId = requestAnimationFrame(animate);
  gameTimer += 1;
  if (gameTimer >= endTime) {
    setTimeout(() => {
      ctx.fillStyle = `rgba(255,255,255,0.5)`;
      ctx.fillRect(0, 0, innerWidth, innerHeight);
      ctx.fillStyle = "black";
      ctx.font = "bold 60px solid";
      ctx.fillText("Game Over", canvas.width / 15, 70);
      ctx.font = "bold 40px solid";
      if (countNums().redN === countNums().blueN) {
        ctx.fillStyle = "purple";
        ctx.fillText(
          `OMG A TIE! ${countNums().redN} : ${countNums().redN}`,
          canvas.width / 10,
          140
        );
      } else if (countNums().redN > countNums().blueN) {
        ctx.fillStyle = "red";
        ctx.fillText(
          `RED WINS! ${countNums().redN} : ${countNums().blueN}`,
          canvas.width / 10,
          140
        );
      } else {
        ctx.fillStyle = "blue";
        ctx.fillText(
          `BLUE WINS! ${countNums().redN} : ${countNums().blueN}`,
          canvas.width / 10,
          140
        );
      }
    }, 0);

    cancelAnimationFrame(animationId);
  }
  ctx.clearRect(0, 0, innerWidth, innerHeight);

  for (let index = circleArray.length - 1; index >= 0; index--) {
    let circle = circleArray[index];
    if (gameTimer >= 100) {
      circle.update(); //? Change this to 'circle.draw()' to stop everything from moving
    } else {
      circle.draw();
    }
    // circleArray.forEach((circle, index) => {
    if (
      circle.deco < 2 &&
      getDistance(circleArray[0].x, circleArray[0].y, circle.x, circle.y) <
        circleArray[0].radius + circle.radius
    ) {
      circle.color = "#FFA07A";
    }
    if (
      circle.deco < 2 &&
      getDistance(circleArray[1].x, circleArray[1].y, circle.x, circle.y) <
        circleArray[1].radius + circle.radius
    ) {
      circle.color = "#87CEEB";
    }

    if (circle.deco == 1) {
      if (
        circle.x - circle.radius < -100 ||
        circle.x - circle.radius > canvas.width + 100
      ) {
        circleArray.splice(index, 1);
      }
    }
  }
};

init();
animate();
