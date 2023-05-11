//遊戲變數
let dire = "ArrowRight";
let gameOn = 0;
let 分數 = 0;
let 單圈分數 = 0;
let 過關分數 = 27;
let 難度 = 0;
let rate = 60;
let 時間 = rate / 2;
let start = 0;
let r = 0;
let webSide = 20;
let snakePointList = [
  [parseInt(webSide/2), parseInt(webSide/2)],
  [parseInt(webSide/2)-1, parseInt(webSide/2)],
];
let food = [[0,0],[-1,-1],[-1,-1]];
let zone = 0;
let RGB = {};
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
  makefood(0);
}

function draw() {
  background("#CBDAD5");
  web();
  snake();
  gameOver();
  if (gameOn == 1) {
    // testText();

    if (start == 1) {
      showFood();
      showShinyfood();
      if(zone==1){
        if(timeLoop("shinyFoodMake",600)){
          makefood(1);
        }else if(food[1][0]!=-1){
          if(timeSleep("shinyFoodDei",300)){
            food[1]=[-1,-1];
            delete waiTimeList["shinyFoodDei"];
          }
        }
      }
      if (timeLoop("snakeMove",時間)) {
        snakeMove();
        dieRule();
        if(eatFoodOrNot(0)){
          getPoint(1);
          timeReduce();
          grow();
          makefood(0);
        }
        if(eatFoodOrNot(1)){
          getPoint(2);
          grow();
          foodDei(1);
          delete waiTimeList["shinyFoodDei"];
        }
      };
    } else {
      fill(100);
      textSize((width * 7) / 80);
      text("Click Screen to Start", (width * 42.5) / 400, (width * 13) / 20);
    }
  }
}

function resetGame() {
  snakePointList = [
    [int(webSide/2), int(webSide/2)],
    [int(webSide/2)-1, int(webSide/2)],
  ];
  food = [[0,0],[-1,-1],[-1,-1]];
  dire = "ArrowRight";
  gameOn = 0;
  分數 = 0;
  單圈分數 = 0;
  難度 = 0;
  時間 = rate / 2;
  start = 0;
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
  setColor("snake");
  if (zone == 1 && timeLoop("snake", 30)) {
    for (let i = 0; i < 3; i++) {
      snakeChange[i] = int(random(20)) - 10;
      RGB["snake"][i] = int(random(256));
    }
  }
  else if (zone == 0) {
    RGB["snake"] = [21, 164, 111];
    snakeChange = [2, 2, 2];
  }
  let countNumber = 0;
  for (let i of snakePointList) {
    fill(
      RGB["snake"][0] + snakeChange[0] * countNumber * (-1) ** countNumber,
      RGB["snake"][1] + snakeChange[1] * countNumber * (-1) ** countNumber,
      RGB["snake"][2] + snakeChange[2] * countNumber * (-1) ** countNumber
    );
    rect(i[0] * 2 * r, i[1] * 2 * r, 2 * r, 2 * r);
    countNumber += 1;
  }
}
function snakeMove(direction = dire) {
  for (let i = snakePointList.length - 1; i > 0; i--) {
    snakePointList[i][0] = snakePointList[i - 1][0];
    snakePointList[i][1] = snakePointList[i - 1][1];
  }
  if (direction == "ArrowRight") {
    snakePointList[0][0] += 1;
  } else if (direction == "ArrowLeft") {
    snakePointList[0][0] += -1;
  } else if (direction == "ArrowUp") {
    snakePointList[0][1] += -1;
  } else if (direction == "ArrowDown") {
    snakePointList[0][1] += 1;
  }
}
function grow() {
  snakePointList.push([
    snakePointList[snakePointList.length - 1][0],
    snakePointList[snakePointList.length - 1][1],
  ]);
}

function keyPressed() {
  if (key == "g") {
    getPoint(1);
    timeReduce()
    grow()
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
    if (start == 1 && timeSleep("gameOver", 180)) {
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
      resetGame();
      goToStartWindow();
      // showHistoryList();
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
      snakePointList[0][0] > webSide - 1 ||
      snakePointList[0][0] < 0  ||
      snakePointList[0][1] < 0 ||
      snakePointList[0][1] > webSide - 1
    ) {
      gameOn = 0;
    }
  }
}

function makefood(number) {
  let foodPoint=0;
  let foodRandom=int(random(webSide**2-snakePointList.length));
  let snakeList=[];
  for(let i of snakePointList){
    snakeList.push(i[0]*webSide+i[1]);
  }

  while(foodRandom!=0){
    foodPoint+=1;
    if(snakeList.indexOf(foodPoint)==-1){
      foodRandom-=1;
    }
  }
  food[number]=[int(foodPoint/webSide),foodPoint%webSide];
}
function showShinyfood(){
  let foodX = food[1][0] * 2 * r;
  let foodY = food[1][1] * 2 * r;
  setColor("shinyFood",[240,240,240]);
  if(timeLoop("Shinyfood",30)){
    RGB["shinyFood"]=[int(random(256)), int(random(256)), int(random(256))];
  }
  let shinyColor=color(RGB["shinyFood"][0],RGB["shinyFood"][1],RGB["shinyFood"][2]);
  fill(shinyColor);
  rect(foodX, foodY, 2 * r, 2 * r);
  fill(240);
  rect(foodX + r / 5, foodY + r / 5, 2 * r - (r * 2) / 5, 2 * r - (r * 2) / 5);
}
function showFood() {
  let foodX = food[0][0] * 2 * r;
  let foodY = food[0][1] * 2 * r;
  fill(240);
  rect(foodX, foodY, 2 * r, 2 * r);
  rect(foodX + r / 5, foodY + r / 5, 2 * r - (r * 2) / 5, 2 * r - (r * 2) / 5);
}
function eatFoodOrNot(i) {
  if (snakePointList[0][0] == food[i][0] && snakePointList[0][1] == food[i][1]) {
    return true;
  }
}
function foodDei(number){
  food[number]=[-1,-1];
}
function testText() {
  textSize(12);
  text("waiTimeList = " + Object.keys(waiTimeList), 20, 20);
  text("snakeY = " + snakePointList[0][1], 20, 40);
  text("Food[0] = " + food[0][0]+","+food[0][1], 20, 60);
  text("Food[1] = " + food[1][0]+","+food[1][1], 20, 80);
  text("單圈分數 = " + 單圈分數, 20, 100);
  text("Time = " + 時間, 20, 120);
}
function mousePressed() {
  if (gameOn != 0) {
    start = 1;
    timeLoop("gameStart", 1);
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
      resetGame();
      goToStartWindow();
      // showHistoryList();
  }
}
function getPoint(number) {
  分數 += number;
  單圈分數 += 1;
}
function timeReduce(){
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
}
function timeFormate(time) {
  if (time < 2) {
    time = 2;
  }
  return time;
}
function timeLoop(timeName, number,loop=true) {
  if (!waiTimeList.hasOwnProperty(timeName)) {
    waiTimeList[timeName] = frameCount;
      return true;
  }
  else if (frameCount - waiTimeList[timeName] > number) {
    waiTimeList[timeName] = frameCount;
    return true;
  }
}
function timeSleep(timeName, number) {
  if (!waiTimeList.hasOwnProperty(timeName)) {
    waiTimeList[timeName] = frameCount;
  }
  else if (frameCount - waiTimeList[timeName] > number) {
    waiTimeList[timeName] = frameCount;
    return true;
  }
}
function setColor(colorName,value=[0,0,0]){
  if (!RGB.hasOwnProperty(colorName)) {
    RGB[colorName] = value;
  }
}
