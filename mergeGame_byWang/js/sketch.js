//遊戲變數
let snakePointList = [
  [0, 0],
  [-1, 0],
];
let food = [[0,0],[0,0],[0,0]];
let dire = "ArrowRight";
let startTime = 0;
let goTime = 0;
let gameOn = 0;
let 分數 = 0;
let 單圈分數 = 0;
let 過關分數 = 27;
let 難度 = 0;
let rate = 60;
let 時間 = rate / 2;
let start = 0;
let exitPoint = [-1, 0];
let r = 0;
let webSide = 20;
let zone = 0;
let snakeRGB = [100, 100, 100];
let snakeChange = [0, 0, 0];
let 滑鼠調節器 = 0;
let zone計時器 = 0;
let pressed = 0;
let waiTimeList = {};

goToStartWindow();

function setup() {
  frameRate(rate);
  createCanvas(min(windowWidth, windowHeight), min(windowWidth, windowHeight));
  r = width / (webSide * 2);
  makefood();
}

function draw() {
  background(220);
  web();
  snake();
  gameOver();
  if (gameOn == 1) {
    testText();

    if (start == 1) {
      showFood();
      timeControl(時間);
    } else {
      fill(100);
      textSize((width * 7) / 80);
      text("Click Screen to Start", (width * 42.5) / 400, (width * 13) / 20);
    }
  }
}

function resetGame() {
  snakePointList = [
    [0, 0],
    [-1, 0],
  ];
  food = [0, 0];
  dire = "ArrowRight";
  startTime = 0;
  goTime = 0;
  gameOn = 0;
  分數 = 0;
  單圈分數 = 0;
  難度 = 0;
  時間 = rate / 2;
  start = 0;
  exitPoint = [-1, 0];
  r = width / (webSide * 2);
  zone = 0;
  滑鼠調節器 = 0;
  zone計時器 = 0;
  pressed = 0;
  waiTimeList = {};
  makefood();
}

function web() {
  for (let j = 0; j < webSide + 1; j++) {
    for (let i = 0; i < webSide + 1; i++) {
      noFill();
      stroke(150);
      rect(i * 2 * r, j * 2 * r, 2 * r, 2 * r);
    }
  }
}

function snake() {
  // if (計數器 == 30) {
  //   計數器 = 0;
  // }
  // if (zone == 1 && 計數器 == 0) {
  //   for (let i = 0; i < 3; i++) {
  //     snakeChange[i] = int(random(20)) - 10;
  //     snakeRGB[i] = int(random(256));
  //   }
  // }
  if (zone == 1 && timeCount("snake", 30)) {
    for (let i = 0; i < 3; i++) {
      snakeChange[i] = int(random(20)) - 10;
      snakeRGB[i] = int(random(256));
    }
  }
  if (zone == 0) {
    snakeRGB = [100, 100, 100];
    snakeChange = [0, 0, 0];
  }
  let countNumber = 0;
  for (let i of snakePointList) {
    //fill(snakeRGB[0]+i*snakeChange,snakeRGB[1]+i*snakeChange,snakeRGB[2]+i*snakeChange);
    fill(
      snakeRGB[0] + snakeChange[0] * countNumber * (-1) ** countNumber,
      snakeRGB[1] + snakeChange[1] * countNumber * (-1) ** countNumber,
      snakeRGB[2] + snakeChange[2] * countNumber * (-1) ** countNumber
    );
    rect(width / 2 + i[0] * 2 * r, width / 2 + i[1] * 2 * r, 2 * r, 2 * r);
    countNumber += 1;
  }
}
function snakeMove(direction = dire) {
  for (let i = snakePointList.length - 1; i > 0; i--) {
    snakePointList[i][0] = snakePointList[i - 1][0];
    snakePointList[i][1] = snakePointList[i - 1][1];
  }
  exitPoint[0] = snakePointList[1][0];
  exitPoint[1] = snakePointList[1][1];
  if (direction == "ArrowRight") {
    snakePointList[0][0] += 1;
  } else if (direction == "ArrowLeft") {
    snakePointList[0][0] += -1;
  } else if (direction == "ArrowUp") {
    snakePointList[0][1] += -1;
  } else if (direction == "ArrowDown") {
    snakePointList[0][1] += 1;
  }
  dieRule();
  eatFoodOrNot();
}
function grow() {
  snakePointList.push([
    snakePointList[snakePointList.length - 1][0],
    snakePointList[snakePointList.length - 1][1],
  ]);
}
function timeControl(milliscened) {
  if (milliscened < 2) {
    milliscened = 2;
  }
  if (goTime - startTime < milliscened) {
    goTime = frameCount;
  } else {
    if (gameOn != 0) {
      snakeMove();
      startTime = frameCount;
      goTime = frameCount;
    }
  }
}

function keyPressed() {
  if (key == "g") {
    getPoint();
  } else if (keyCode > 36 && keyCode < 41) {
    dire = key;
  }
}
function gameOver() {
  if (gameOn == 0 && start == 1) {
    gamePoint = 分數;
    while (snakePointList.length != 0) {
      snakePointList.pop();
    }
    if (分數 > 過關分數) {
      fill("#285943");
      textSize((width * 3) / 20);
      text("YOU WIN", (width * 7) / 40, (width * 6) / 10);
      textSize((width * 7) / 80);
      text("Get Point: " + 分數, (width * 15) / 80, (width * 7) / 10);
    } else {
      fill(101, 51, 77);
      textSize((width * 3) / 20);
      text("Game Over", (width * 43) / 400, (width * 6) / 10);
      textSize((width * 7) / 80);
      text("Get Point: " + 分數, (width * 3) / 25, (width * 7) / 10);
    }
    if (start == 1 && timeCount("gameOver", 60)) {
      let gameMinute = int((frameCount-waiTimeList.gameStart)/3600);
      let gameSecond = int((frameCount-waiTimeList.gameStart)/60);
      if(gameMinute<10){
        gameMinute="0"+gameMinute;
      }
      if(gameSecond<10){
        gameSecond="0"+gameSecond;
      }
      newGamer[`time`]=gameMinute+":"+gameSecond;
      newGamer[`score`]=分數;
      upData();
      goToStartWindow();
      showHistoryList();
      resetGame();
    }
  }
}
function dieRule() {
  if (snakePointList.length != 0) {
    for (let i = 1; i < snakePointList.length - 1; i++) {
      if (
        snakePointList[i][0] == snakePointList[0][0] &&
        snakePointList[i][1] == snakePointList[0][1]
      ) {
        gameOn = 0;
      }
    }
    if (
      snakePointList[0][0] > webSide / 2 - 1 ||
      snakePointList[0][0] < -1 * (webSide / 2) ||
      snakePointList[0][1] < -1 * (webSide / 2) ||
      snakePointList[0][1] > webSide / 2 - 1
    ) {
      gameOn = 0;
    }
  }
}
function makefood() {
  food[0]=([int(random(-10, 9)),int(random(-10, 9))]);
  let isFoodInSnake = -1;
  let forFlag = 0;
  while (isFoodInSnake != 0) {
    forFlag = 0;
    for (let i of snakePointList) {
      if (i[0] == food[0][0] && i[1] == food[0][1]) {
        forFlag = 1;
        break;
      }
    }
    if (forFlag == 1) {
      food[0][0] = int(random(-10, 9));
      food[0][1] = int(random(-10, 9));
    } else {
      isFoodInSnake = 0;
    }
  }
}
function makeShinyfood(){
  
}
function showFood() {
  let foodX = width / 2 + food[0][0] * 2 * r;
  let foodY = width / 2 + food[0][1] * 2 * r;
  fill(240);
  rect(width / 2 + food[0][0] * 2 * r, width / 2 + food[0][1] * 2 * r, 2 * r, 2 * r);

  rect(foodX + r / 5, foodY + r / 5, 2 * r - (r * 2) / 5, 2 * r - (r * 2) / 5);
}
function eatFoodOrNot() {
  if (snakePointList[0][0] == food[0][0] && snakePointList[0][1] == food[0][1]) {
    getPoint();
  }
}
function testText() {
  textSize(12);
  text("snakeX = " + snakePointList[0][0], 20, 20);
  text("snakeY = " + snakePointList[0][1], 20, 40);
  text("FoodX = " + food[0][0], 20, 60);
  text("FoidY = " + food[0][1], 20, 80);
  text("dire = " + dire, 20, 100);
  text("Time = " + 時間, 20, 120);
}
function mousePressed() {
  if (gameOn != 0) {
    start = 1;
    timeCount("gameStart", 1);
    let xValue = mouseX - width / 2 - snakePointList[0][0] * 2 * r + r;
    let yValue = mouseY - width / 2 - snakePointList[0][1] * 2 * r + r;
    if (dire == "ArrowUp" || dire == "ArrowDown") {
      if (xValue > 0) {
        dire = "ArrowRight";
      } else {
        dire = "ArrowLeft";
      }
    } else {
      if (yValue > 0) {
        dire = "ArrowDown";
      } else {
        dire = "ArrowUp";
      }
    }
    return false;
  } else if (start == 1) {
    timeCount("gameOver", 60);
  }
}
function getPoint() {
  分數 += 1;
  單圈分數 += 1;
  if (單圈分數 > 5) {
    zone = 1;
    時間 -= 1; //0.5=30
    if (單圈分數 == 11) {
      難度 += 1;
      單圈分數 -= 11 - 難度;
      時間 += (5 - 難度) * 4;
      zone = 0;
    }
  } else {
    時間 -= 4;
  }
  時間 = timeFormate(時間);
  grow();
  makefood();
}
function timeFormate(time) {
  if (time < 2) {
    time = 2;
  }
  return time;
}
function timeCount(timeName, number) {
  if (!waiTimeList.hasOwnProperty(timeName)) {
    waiTimeList[timeName] = frameCount;
    // console.log(timeName+":"+waiTimeList[timeName]);
  }
  if (frameCount - waiTimeList[timeName] > number) {
    // console.log(timeName+" passed:"+ (frameCount -waiTimeList[timeName]));
    waiTimeList[timeName] = frameCount;
    return true;
  }
}
