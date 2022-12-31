const express = require('express');
const { createReadStream } = require('fs');
const bodyParser = require('body-parser');

// USERS database object
const USERS = {
    alice: "password",
    bob: "hunter2"
}

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    createReadStream('index.html').pipe(res);
});

app.post('/login', (req, res) => {
    const username = req.body.username
    const password = USERS[username]

    if (req.body.password === password) {
        res.cookie('username', username)
        res.send('Success!')
    } else {
        res.send('Fail!')
    }
});

app.listen(4000, () => {
    console.log("Server running on port 4000...")
});