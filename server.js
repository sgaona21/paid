const http = require('http');
const fs = require('fs');

const PORT = 3000;

const server = http.createServer((req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // === GET /read ===
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

  // === POST /write ===
  else if (req.url === '/write' && req.method === 'POST') {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      let newEntry;

      try {
        newEntry = JSON.parse(body);
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }

      fs.readFile('data.txt', 'utf8', (err, data) => {
        let existingData = [];

        if (!err && data.trim()) {
          try {
            existingData = JSON.parse(data);
          } catch (e) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: 'Corrupted JSON in file' }));
          }
        }

        // Add an index to the new entry
        newEntry.index = existingData.length + 1;
        existingData.push(newEntry);

        fs.writeFile('data.txt', JSON.stringify(existingData, null, 2), err => {
          if (err) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: 'Failed to write file' }));
          }

          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ status: 'success', entry: newEntry }));
        });
      });
    });
  }

  // === 404 fallback ===
  else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Route not found');
  }
});

server.listen(PORT, () => {
  console.log(`Poor man's DB running at http://localhost:${PORT}`);
});
