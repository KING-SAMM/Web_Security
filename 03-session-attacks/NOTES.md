server1.js: 
        Insecure server from '02-http-cookies'. Added balances and login functionality. (See NOTES.md on 02-http-cookies for details on nature of vulnerability)

server2.js:
        Sign the cookie as fix for server1.js. In this example we achieve this with the express framework's built in signer and validator, as against using the crypto primitives.
