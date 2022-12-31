const net = require('net');
const dns = require('dns');

// Get IP of example.com
dns.lookup('www.google.com', (err, address) => {
    if (err) throw err

    const socket = net.createConnection({
        host: address,  // IP address
        port: 80
    })
    console.log("Address is: ", address)
    // Get root of
    // Domain of interest within target IP 
    const request = `
GET / HTTP/1.1
Host: www.google.com 

`.slice(1)
    
    socket.write(request)
    socket.write(address)
    
    socket.pipe(process.stdout)
})
