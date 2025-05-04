// 1. Load the built-in 'http' module from Node
const http = require('http');

// 2. Define a port to listen on
const PORT = 3000;

// 3. Create a server
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' }); // Set response header
  res.end('Hello from Node! 🚀'); // Send response
});

// 4. Start the server
server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
