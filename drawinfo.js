require('dotenv').config();
const express = require('express'); // 引入 Express
const cors = require('cors'); // 引入 CORS 中間件
const mongoose = require('mongoose'); // 引入 Mongoose
const app = express(); // 初始化 Express 應用
const PORT = process.env.PORT || 3000; // 設置端口

// 啟用 CORS 中間件（解決跨域問題）
app.use(cors());

// 提供靜態文件（設定 public 資料夾）
app.use(express.static('public'));

// 啟用解析 JSON 的中間件
app.use(express.json());

// 連接 MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB:', err));

const DrawSchema = new mongoose.Schema({
    artist: { type: String, required: true },
    size: { type: String, required: true },
    creation_era: { type: String, required: true },
    media: { type: String, required: true },
    collector: { type: String, required: true },
    collect_year: { type: String, required: true },
    client: { type: String, required: true },
    website: { type: String, required: true },
    intro: { type: String, required: true }
});

const DrawInfo = mongoose.model('drawinfos', DrawSchema);


// 取得指定 ID 的資料
app.get('/info/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const artist = await DrawInfo.findById(id);
        if (!artist) {
            return res.status(404).json({ error: 'Info not found' });
        }
        res.json(artist);
    } catch (err) {
        res.status(500).json({ error: 'Error retrieving information: ' + err.message });
    }
});

// 新增資料
app.post('/info', async (req, res) => {
    try {
        const info = new DrawInfo(req.body);
        const savedInfo = await info.save();
        res.status(201).json(savedInfo);
    } catch (err) {
        res.status(400).json({ error: 'Error saving info: ' + err.message });
    }
});

// 修改資料
app.put('/info', async (req, res) => {
    const { _id, ...other } = req.body;

    try {
        const updatedInfo = await DrawInfo.findByIdAndUpdate(_id, other, { new: true });
        if (!updatedInfo) {
            return res.status(404).json({ error: 'Info not found' });
        }
        res.status(200).json(updatedInfo);
    } catch (err) {
        res.status(400).json({ error: 'Error updating info: ' + err.message });
    }
});

// 刪除資料
app.delete('/info/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const info = await DrawInfo.findByIdAndDelete(id);
        if (!info) {
            return res.status(404).json({ error: 'Info not found' });
        }
        res.json({ message: 'Info deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Error deleting info: ' + err.message });
    }
});

// 啟動伺服器
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});