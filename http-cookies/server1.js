const express = require('express');
const { createReadStream } = require('fs');

const app = express();

app.get('/', (req, res) => {
    createReadStream('http-cookies/index.html').pipe(res);
});

app.post('/login', (req, res) => {
    
});

app.listen(4000, () => {
    console.log("Server running on port 4000...")
});