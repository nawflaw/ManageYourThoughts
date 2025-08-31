let img;
let circles = [];
let startTimer = false;
let timer = 0;
let hasExploded = false;

function preload() {
  img = loadImage("headcomp.JPG"); 
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
}

function draw() {
  background(255);
  image(img, width / 2, height / 2, img.width / 1.5, img.height / 1.5);

  if (startTimer && !hasExploded) {
    timer++;
  }

  for (let i = 0; i < circles.length; i++) {
    let c = circles[i];

    if (timer >= 60 * 40) {
      c.x += random(-5, 5);
      c.y += random(-5, 5);
      c.alpha -= 5;
      hasExploded = true;
    }

    //(cercles qui bougent)
    c.size = c.baseSize + sin(frameCount * 0.1 + c.offset) * 5;

    fill(255, 160, 122, c.alpha); // couleur saumon
    noStroke();
    circle(c.x, c.y, c.size);
  }

  // Enlève les cercles devenus invisibles
  circles = circles.filter(c => c.alpha > 0);
}

function mousePressed() {
  if (hasExploded) return;

  if (!startTimer) {
    startTimer = true;
  }

  let newCircle = {
    x: random(width / 2 - 200, width / 2 + 200),
    y: random(0, height / 2 - 80),
    baseSize: random(20, 60),
    size: 20,
    offset: random(TWO_PI),
    alpha: 255
  };

  circles.push(newCircle);
}
