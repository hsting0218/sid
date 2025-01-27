const express = require('express');
const cors = require('cors'); 
const path = require('path');
const app = express();
const port = 3000;

app.use(cors());
app.use('/images', express.static(path.join(__dirname, 'images')));

app.get('/api/products', (req, res) => {
    const products = [
        { id: 1, name: '籃球鞋', price: 1500, image: 'images/shoe.jpg' },
        { id: 2, name: '運動短褲', price: 800, image: 'images/shorts.jpg' },
        { id: 3, name: '運動手環', price: 300, image: 'images/band.jpg' }
    ];
    res.json(products);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});