// Make test localstorage
var storage = window.localStorage;
storage[`1`] = ["Alice", "01:23", 10];
storage[`2`] = ["Bob", "02:34", 15];
storage[`3`] = [`Charlie`, "03:45", 18];
storage[`4`] = [`David`, "04:56", 7];
storage[`5`] = [`Eve`, "05:01", 11];
let pointList = [];
let name = document.getElementById("name");
let updatePointList = [];
let score = 0;
let startWindow = document.getElementById("startWindow");
let gameWindow = document.getElementById("gameWindow");
let table = document.querySelector("#table");
let newGamer = {
  id:"",
  name: "",
  time: "",
  score: 0,
};

//抓取storage資料存成object
//storage資料為二維陣列[key,value]
//需要對value作分析才可區分value中的name、time、score
for (let i of Object.entries(storage)) {
  let data = {};
  data.id = i[0];
  data.name = i[1].split(",")[0];
  data.time = i[1].split(",")[1];
  data.score = parseInt(i[1].split(",")[2]);
  pointList.push(data);
}
//排序取得的pointList
pointList = pointList.sort(function (a, b) {
  return b.score - a.score;
});

// 切換畫面函式
function setStyleDisplay(element, hide) {
  if (hide == 0) element.setAttribute("style", "display:none;");
  else if (hide == 1) element.setAttribute("style", "display:block;");
}

// 進入開始畫面
function goToStartWindow() {
  setStyleDisplay(startWindow, 1);
  setStyleDisplay(gameWindow, 0);
}

// 進入遊戲
function getInGame() {
  const playerName = document.getElementById("name").value;

  // 處理玩家名稱輸入錯誤的情況
  if (!playerName) {
    alert("請輸入您的名稱");
    return;
  }
  setStyleDisplay(startWindow, 0);
  setStyleDisplay(gameWindow, 1);
  gameOn = 1;
}

//離開遊戲,回到起始畫面
function upData() {
  //抓取玩家分數並排序
  newGamer.name = name.value;
  //判斷是否需要更新排行榜
  if (pointList.length >= 20) {
    //大於20筆資料再比較
    if (newGamer.score > pointList[pointList.length - 1].score) {
      newGamer.id = pointList[pointList.length - 1].id;
      storage[newGamer.id] = [newGamer.name, newGamer.time, newGamer.score];
      pointList.pop();
      const upDataGamer = newGamer;
      pointList.push({
        id:newGamer.id,
        name:newGamer.name,
        time:newGamer.time,
        score:newGamer.score
      });
      pointList = pointList.sort(function (a, b) {
        return b.score - a.score;
      });
    }
  } else {
    newGamer.id = Object.entries(storage).length + 1;
    storage[newGamer.id] = [newGamer.name, newGamer.time, newGamer.score];
    pointList.push({
        id:newGamer.id,
        name:newGamer.name,
        time:newGamer.time,
        score:newGamer.score
      });
    pointList = pointList.sort(function (a, b) {
      return b.score - a.score;
    });


  }
  console.log("pointList = ");
  for (let i of pointList) {
    console.log(i);
  }
  console.log("storage = " + Object.entries(storage).length);
  return pointList;
}