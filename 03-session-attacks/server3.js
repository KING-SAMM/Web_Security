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
const BALANCES = { alice: 500, bob: 100 } 

let nextSessionId = 0; // Added
//Map sessionId to username
const SESSIONS = {} // Added

app.get('/', (req, res) => {
    const sessionId = req.cookies.sessionId // Modified
    const username = SESSIONS[sessionId] // Added

    if (username) {
        let balance = BALANCES[username] 
        res.send(`Hi ${username}. Your balance is $${balance}`)
    } else {
        createReadStream('index.html').pipe(res);
    }
});

app.post('/login', (req, res) => {
    const username = req.body.username
    const password = USERS[username]

    if (req.body.password === password) {
        res.cookie('sessionId', nextSessionId) //Modified
        // Add sessionId to dadabase
        SESSIONS[nextSessionId] = username // Added
        nextSessionId += 1 // Added
        res.redirect('/') 
    } else {
        res.send('Fail!')
    }
});

// Logout route
app.get('/logout', (req, res) => {
    const sessionId = req.cookies.sessionId // Added
    // Delete from database
    delete SESSIONS[sessionId]  // Added
    res.clearCookie('sessionId')  // Modified
    res.redirect('/')
})

app.listen(4000, () => {
    console.log("Server running on port 4000...")
});