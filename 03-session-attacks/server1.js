const express = require('express');
const { createReadStream } = require('fs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// USERS database object
const USERS = {
    alice: "password",
    bob: "hunter2"
}
const BALANCES = { alice: 500, bob: 100 } // Added

app.get('/', (req, res) => {
    const username = req.cookies.username

    if (username) {
        let balance = BALANCES[username] // Added
        res.send(`Hi ${username}. Your balance is $${balance}`) // Modiifed
    } else {
        createReadStream('index.html').pipe(res);
    }
});

app.post('/login', (req, res) => {
    const username = req.body.username
    const password = USERS[username]

    if (req.body.password === password) {
        res.cookie('username', username)
        res.redirect('/') // Added
    } else {
        res.send('Fail!')
    }
});

// Added. Logout route
app.get('/logout', (req, res) => {
    res.clearCookie('username')
    res.redirect('/')
})

app.listen(4000, () => {
    console.log("Server running on port 4000...")
});