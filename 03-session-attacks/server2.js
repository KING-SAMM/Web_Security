const express = require('express');
const { createReadStream } = require('fs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// Secret key should be generated with appropriate generator 
const COOKIE_SECRET = "c!iuE;wo$bjb%su_@YbjMseWkls#"; // Added

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(COOKIE_SECRET));   // Modified

// USERS database object
const USERS = {
    alice: "password",
    bob: "hunter2"
}
const BALANCES = { alice: 500, bob: 100 } // Added

app.get('/', (req, res) => {
    // (Validator)
    const username = req.signedCookies.username // Modified

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
        // Sign the cookie with the secret key (COOKIE_SECRET) (Signer)
        res.cookie('username', username, { signed: true })  // Modified
        res.redirect('/')
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