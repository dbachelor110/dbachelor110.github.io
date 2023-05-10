//開始按鈕ID start-btn => start
//新function showHistoryList:呼叫renderLeaderboard(pointList)
//rankCell改成用js排序來完成動態生成。
//目前使用function:showHistoryList、renderLeaderboard。
//目前使用變數:scoreboard、startBtn。

const scoreboard = document.getElementById("scoreboard");
const startBtn = document.getElementById("start");



function startGame() {
  const playerName = document.getElementById("name").value;

  // 處理玩家名稱輸入錯誤的情況
  if (!playerName) {
    alert("請輸入您的名稱");
    return;
  }

  // 執行遊戲邏輯，並獲取遊戲資料
  // const leaderboard = getLeaderboard();
  const leaderboard = pointList;


  // 將遊戲資料渲染到排行榜中
  renderLeaderboard(leaderboard);
}

function getLeaderboard() {
  // 假設這裡是網絡請求，獲取遊戲資料
  const leaderboard = generateLeaderboard();
  return leaderboard;
}

function generateLeaderboard() {
  // 產生假資料
  const leaderboard = [
    {
      name: "Alice",
      time: "01:23",
      score: 100,
      rank: 1,
    },
    {
      name: "Bob",
      time: "02:34",
      score: 80,
      rank: 2,
    },
    {
      name: "Charlie",
      time: "03:45",
      score: 60,
      rank: 3,
    },
    {
      name: "David",
      time: "04:56",
      score: 40,
      rank: 4,
    },
    {
      name: "Eve",
      time: "05:01",
      score: 20,
      rank: 5,
    },
  ];
  return leaderboard;
}

function renderLeaderboard(leaderboard) {
  // 清空原有的排行榜
  scoreboard.innerHTML = "";

  // 生成新的排行榜
  leaderboard.forEach((player) => {
    const row = document.createElement("tr");

    const nameCell = document.createElement("td");
    nameCell.innerText = player.name;
    row.appendChild(nameCell);

    const timeCell = document.createElement("td");
    timeCell.innerText = player.time;
    row.appendChild(timeCell);

    const scoreCell = document.createElement("td");
    scoreCell.innerText = player.score;
    row.appendChild(scoreCell);

    const rankCell = document.createElement("td");
    rankCell.innerText = leaderboard.indexOf(player) + 1;
    row.appendChild(rankCell);

    scoreboard.appendChild(row);
  });
}
function showHistoryList() {
  // 執行遊戲邏輯，並獲取遊戲資料
  const leaderboard = pointList;

  // 將遊戲資料渲染到排行榜中
  renderLeaderboard(leaderboard);
}
startBtn.addEventListener("click", getInGame);