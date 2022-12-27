const express = require('express');
const { createReadStream } = require('fs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// USERS database object
const USERS = {
    alice: "password",
    bob: "hunter2"
}

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
    // If request already contains a cookie
    const username = req.cookies.username

    // display a greeting with the cookie value
    if (username) {
        res.send(`Hi ${username}`)
    } else {
        createReadStream('http-cookies/index.html').pipe(res);
    }
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