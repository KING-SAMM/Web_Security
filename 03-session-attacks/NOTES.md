server1.js: 
        Insecure server from '02-http-cookies'. Added balances and login functionality. (See NOTES.md on 02-http-cookies for details on nature of vulnerability)

server2.js:
        Sign the cookie as a fix for server1.js. In this example we achieve this with the express framework's built in signer and validator, as against using the crypto primitives.

        New Vulnerability: Anyone who steals the cookie (perhaps through malware) can always login with it. Even when the user has changed the password and a new tag/cookie has been generated. The stolen/old cookie/tag will stll login anyone who has it. This is despite the fact that the old password fails the login!
