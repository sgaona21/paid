const http = require('http');
const fs = require('fs');

const PORT = 3000;

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
      }
      

  // Handle GET /read
  if (req.url === '/read' && req.method === 'GET') {
    fs.readFile('data.txt', 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        return res.end('Error reading file');
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(data);
    });
  }

  // Handle POST /write
  else if (req.url === '/write' && req.method === 'POST') {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        const newEntry = JSON.parse(body);

        fs.readFile('data.txt', 'utf8', (err, data) => {
          if (err) return res.end('Failed to read existing data.');

          let existingData = [];
          if (data) {
            existingData = JSON.parse(data);
          }

          existingData.push(newEntry);

          fs.writeFile('data.txt', JSON.stringify(existingData, null, 2), err => {
            if (err) return res.end('Failed to write file.');

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ status: 'success', entry: newEntry }));
          });
        });
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Invalid JSON');
      }
    });
  }

  // Default fallback
  else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Route not found');
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
