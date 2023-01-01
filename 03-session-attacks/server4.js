const express = require('express');
const { createReadStream } = require('fs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { randomBytes } = require('crypto');  // Added

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// USERS database object
const USERS = {
    alice: "password",
    bob: "hunter2"
}
const BALANCES = { alice: 500, bob: 100 } 

//Map sessionId to username
const SESSIONS = {} 

app.get('/', (req, res) => {
    const sessionId = req.cookies.sessionId 
    const username = SESSIONS[sessionId] 

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
        const nextSessionId = randomBytes(16).toString('base64') // Added. 16 bytes = 128 bits
        res.cookie('sessionId', nextSessionId) 
        // Add sessionId to dadabase
        SESSIONS[nextSessionId] = username 
        res.redirect('/') 
    } else {
        res.send('Fail!')
    }
});

// Logout route
app.get('/logout', (req, res) => {
    const sessionId = req.cookies.sessionId 
    // Delete from database
    delete SESSIONS[sessionId]  
    res.clearCookie('sessionId')  
    res.redirect('/')
})

app.listen(4000, () => {
    console.log("Server running on port 4000...")
});