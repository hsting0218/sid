const express = require('express');
const cors = require('cors'); 
const path = require('path');
const app = express();
const port = 3000;

app.use(cors());
app.use('/images', express.static(path.join(__dirname, 'images')));

app.get('/players', (req, res) => {
    const players = [
        { id: 1, name: 'Curry', team: 'GSW', ppg: 22.3, image: 'images/shoe.jpg' },
        { id: 2, name: 'James', team: 'LAL', ppg: 23.7, image: 'images/shorts.jpg' },
        { id: 3, name: 'Durant', team: 'PHX', ppg: 27.2, image: 'images/band.jpg' }
    ];
    res.json(players);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});