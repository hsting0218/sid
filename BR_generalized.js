// const puppeteer = require('puppeteer');
// const express = require('express');
// const cors = require('cors');

// const app = express();
// const port = 3000;

// app.use(cors());

// app.get('/api/players', async (req, res) => {
//     try {
//         // 啟動 Puppeteer 瀏覽器實例
//         const browser = await puppeteer.launch({ headless: false });  // 開啟瀏覽器，便於調試
//         const page = await browser.newPage();

//         // 訪問目標頁面
//         await page.goto('https://www.basketball-reference.com/leagues/NBA_2025_per_game.html', { waitUntil: 'domcontentloaded' });

//         // 打印頁面 HTML 用於檢查
//         const html = await page.content();
//         console.log(html);  // 打印頁面 HTML
//         // 可以將 HTML 寫入文件查看是否正確
//         // const fs = require('fs');
//         // fs.writeFileSync('page.html', html);

//         // 抓取球員資料
//         const players = await page.evaluate(() => {
//             const rows = document.querySelectorAll('#per_game_stats tbody tr');
//             const playerData = [];
            
//             rows.forEach((row, index) => {
//                 const playerNameElement = row.querySelector('td[data-stat="player"] a');
//                 if (playerNameElement) {
//                     const playerName = playerNameElement.textContent.trim();
//                     const playerTeam = row.querySelector('td[data-stat="team_id"]').textContent.trim();
//                     const playerGames = row.querySelector('td[data-stat="g"]').textContent.trim();
//                     const playerPointsPerGame = row.querySelector('td[data-stat="pts_per_g"]').textContent.trim();
//                     const playerReboundsPerGame = row.querySelector('td[data-stat="trb_per_g"]').textContent.trim();
//                     const playerAssistsPerGame = row.querySelector('td[data-stat="ast_per_g"]').textContent.trim();
//                     const playerImage = playerNameElement ? `https://www.basketball-reference.com/req/202106291/images/players/${playerNameElement.href.split('/')[3].replace('.html', '.jpg')}` : 'https://www.basketball-reference.com/req/202106291/images/players/placeholder.jpg';

//                     playerData.push({
//                         rank: index + 1,
//                         name: playerName,
//                         team: playerTeam,
//                         games: playerGames,
//                         points_per_game: playerPointsPerGame,
//                         rebounds_per_game: playerReboundsPerGame,
//                         assists_per_game: playerAssistsPerGame,
//                         image: playerImage,
//                     });
//                 }
//             });
            
//             return playerData;
//         });

//         // 關閉瀏覽器
//         await browser.close();

//         // 返回爬取的球員資料
//         res.json(players);
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         res.status(500).json({ error: 'Unable to fetch player data' });
//     }
// });

// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });

const puppeteer = require('puppeteer');

app.get('/api/players', async (req, res) => {
    try {
        // 启动Puppeteer浏览器实例
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();

        // 访问页面并等待网络空闲
        await page.goto('https://www.basketball-reference.com/leagues/NBA_2025_per_game.html', { waitUntil: 'networkidle2' });

        // 等待表格加载完成
        await page.waitForSelector('#per_game_stats tbody tr', { timeout: 10000 });

        // 获取并处理球员数据
        const players = await page.evaluate(() => {
            const rows = document.querySelectorAll('#per_game_stats tbody tr');
            const playerData = [];

            rows.forEach((row, index) => {
                const playerNameElement = row.querySelector('td[data-stat="player"] a');
                if (playerNameElement) {
                    const playerName = playerNameElement.textContent.trim();
                    const playerTeam = row.querySelector('td[data-stat="team_id"]').textContent.trim();
                    const playerGames = row.querySelector('td[data-stat="g"]').textContent.trim();
                    const playerPointsPerGame = row.querySelector('td[data-stat="pts_per_g"]').textContent.trim();
                    const playerReboundsPerGame = row.querySelector('td[data-stat="trb_per_g"]').textContent.trim();
                    const playerAssistsPerGame = row.querySelector('td[data-stat="ast_per_g"]').textContent.trim();
                    const playerImage = playerNameElement ? `https://www.basketball-reference.com/req/202106291/images/players/${playerNameElement.href.split('/')[3].replace('.html', '.jpg')}` : 'https://www.basketball-reference.com/req/202106291/images/players/placeholder.jpg';

                    playerData.push({
                        rank: index + 1,
                        name: playerName,
                        team: playerTeam,
                        games: playerGames,
                        points_per_game: playerPointsPerGame,
                        rebounds_per_game: playerReboundsPerGame,
                        assists_per_game: playerAssistsPerGame,
                        image: playerImage,
                    });
                }
            });

            return playerData;
        });

        // 关闭浏览器
        await browser.close();

        // 返回球员数据
        res.json(players);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Unable to fetch player data' });
    }
});