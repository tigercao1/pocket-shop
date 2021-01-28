require('dotenv/config');
const express = require('express');
const fs = require('fs');
const cors = require('cors');


const app = express();
const host = process.env.HOST
const port = process.env.PORT;

const rawData = fs.readFileSync('data.json');
let shopData = JSON.parse(rawData);

app.use(cors());

app.get('/', (req, res) => {
    res.send(JSON.stringify(shopData));
});

app.listen(port, () => {
    console.log(`Shop listening at http://${host}:${port}`);
});