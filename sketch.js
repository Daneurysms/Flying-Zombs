let zombies = [];
let numZombies = 3;
let stars = [];
let numStars = 60;
let score = 0;
let duration = 30;
let startTime;
let state = 'start';
let spawnEvery = 60;

function setup() {
  createCanvas(480, 360);
  spawnAllZombies();


  while (stars.length < numStars) {
    let s = {
      x: random(width),
      y: random(300),
      size: random(1, 3),
      phase: random(TWO_PI)
    };
   
    if (dist(s.x, s.y, 430, 50) > 45) stars.push(s);
  }
}

function draw() {
  background(15, 10, 25);
  noStroke();

  
  fill(100, 0, 0);
  ellipse(430, 50, 70, 70);
  fill(15, 10, 25);
  ellipse(445, 40, 60, 60);

  
  fill(40, 30, 50);
  rect(0, 300, 480, 60);

  
  if (state === 'start') {
    for (let z of zombies) drawZombie(z.x, z.y);
    textAlign(CENTER, CENTER);
    fill(255);
    textSize(22);
    text('Click to start', width / 2, height / 2);
    return;
  }

  let elapsed = (millis() - startTime) / 1000;
  let timeLeft = max(0, duration - elapsed);
  if (timeLeft <= 0) state = 'over';

  if (state === 'play') {
    for (let z of zombies) {
      z.x += random(-3, 3);
      z.y += random(-3, 3);
      z.x = constrain(z.x, 30, width - 30);
      z.y = constrain(z.y, 30, height - 30);
    }

   
    if (frameCount % spawnEvery === 0) {
      spawnZombie(floor(random(zombies.length)));
    }
  }

  for (let z of zombies) drawZombie(z.x, z.y);

  
  fill(255);
  textSize(20);
  textAlign(LEFT, TOP);
  text('Score: ' + score, 12, 10);
  textAlign(RIGHT, TOP);
  text('Time: ' + ceil(timeLeft), width - 12, 10);

  
  if (state === 'over') {
    textAlign(CENTER, CENTER);
    textSize(22);
    text('Game over\nScore: ' + score + '\nClick to retry', width / 2, height / 2);
  }
}

function drawZombie(x, y) {
  noStroke();

  
  fill(0, 150, 0);
  ellipse(x, y, 60, 60);

  
  fill(20);
  ellipse(x - 12, y - 5, 10);
  ellipse(x + 12, y - 5, 10);

  
  stroke(20);
  strokeWeight(2);
  line(x - 12, y + 14, x + 12, y + 14);
  for (let i = -9; i <= 9; i += 6) {
    line(x + i, y + 10, x + i, y + 18);
  }
  noStroke();
}

function spawnZombie(i) {
  zombies[i] = { x: random(40, width - 40), y: random(40, height - 40) };
}

function spawnAllZombies() {
  zombies = [];
  for (let i = 0; i < numZombies; i++) spawnZombie(i);
}

function startGame() {
  score = 0;
  startTime = millis();
  state = 'play';
  spawnAllZombies();
}

function mousePressed() {
  if (state === 'start' || state === 'over') {
    startGame();
    return;
  }

  for (let i = 0; i < zombies.length; i++) {
    if (dist(mouseX, mouseY, zombies[i].x, zombies[i].y) < 30) {
      score++;
      spawnZombie(i);
      break;
    }
  }
}