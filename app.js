const express = require('express'); // 引入 Express
const cors = require('cors'); // 引入 CORS 中間件
const app = express(); // 初始化 Express 應用
const port = 3000; // 設置端口

// 啟用 CORS 中間件（解決跨域問題）
app.use(cors());

// 模擬的玩家數據
const players = [
    {
        "name": "Curry",
        "age": "35",
        "height": "6'4",
        "weight": "188lbs",
        "ppg": "25",
        "reb": "3",
        "asg": "6",
        "winning_rate": "50%"
    },
    {
        "name": "James",
        "age": "40",
        "height": "6'8",
        "weight": "205lbs",
        "ppg": "27",
        "reb": "7",
        "asg": "7",
        "winning_rate": "60%"
    }
];

// 定義 API 路由：獲取玩家列表
app.get('/players/:age', (req, res) => {
    const ages = req.params.age;
    const arr = players.filter(item => item.age == ages)
    res.json(arr); // 返回 JSON 數據
});

// 定義 API 路由：獲取玩家列表
app.get('/player2', (req, res) => {
    const ages = req.query.age;
    console.log(ages)
    const arr = players.filter(item => item.age == ages)
    res.json(arr); // 返回 JSON 數據
});

// 啟動伺服器
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});