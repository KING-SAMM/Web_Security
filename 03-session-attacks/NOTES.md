server1.js: 
        Insecure server from '02-http-cookies'. Added balances and login functionality. (See NOTES.md on 02-http-cookies for details on nature of vulnerability)

server2.js:
        Sign the cookie as a fix for server1.js. In this example we achieve this with the express framework's built in signer and validator, as against using the crypto primitives.

        New Vulnerability: Anyone who steals the cookie (perhaps through malware) can always login with it. Even when the user has changed the password and a new tag/cookie has been generated. The stolen/old cookie/tag will stll login anyone who has it. This is despite the fact that the old password fails the login!

server3.js:
        Generate a sessionId cookie for each logged in user and save in DB on loogin, then delete this entry on logout to fix vulnerability of server2.js

        New Vulnerability: If sessionId is a low range of numbers and/or sequential then, depending on what sessionId is received by the attacker, he can easily figure out who logged in after him or before him by simply incrementing or decrementing his own sessionId and trying out different values. 

server4.js:
        To fix vulnerability of server3.js, generate sessionId cookies using a random number generator with a very large range. This ensures the sessionIds can't be guessed or brute forced. In this example, this is achieved using the randomBytes() function from the express framework's crypto module.
