const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

app.get('/data', (req, res) => {
  const filePath = path.join(__dirname, 'database', 'demo', 'data.txt');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('😭 Failed to read data.txt:', err);
      return res.sendStatus(500);
    }

    try {
      const json = JSON.parse(data);
      res.json(json);
    } catch (parseErr) {
      console.error('💀 Invalid JSON in data.txt:', parseErr);
      res.sendStatus(500);
    }
  });

})

app.post('/index', (req, res) => {
  const deletedIndex = Number(req.body.deletedIndex);

  fs.readFile('database/demo/data.txt', 'utf8', (err, data) => {
    const currentdb = JSON.parse(data);
    console.log(currentdb)
    const filteredData = currentdb.filter(obj => obj.index !== deletedIndex);
    console.log(filteredData)
    newDatabaseArrayLength = filteredData.length;
    console.log(newDatabaseArrayLength)
    for (let i = 0; i < newDatabaseArrayLength; i++) {
      filteredData[i].index = i + 1;
    }
    console.log(filteredData);

    fs.writeFile('database/demo/data.txt', JSON.stringify(filteredData, null, 2), (err) => {
      res.sendStatus(204)
    });

  })
  
});

app.post('/update-row', (req, res) => {
  const updatedRow = req.body;
  console.log('Got updated row from client:', updatedRow);

  fs.readFile('database/demo/data.txt', 'utf8', (err, data) => {
    const currentdb = JSON.parse(data);
    console.log(currentdb)
    console.log(updatedRow.index)
    const updatedIndex = currentdb.findIndex(obj => obj.index === Number(updatedRow.index))
    console.log('updated index: ', updatedIndex);
    currentdb[updatedIndex] = updatedRow;
    console.log(currentdb)

    fs.writeFile('database/demo/data.txt', JSON.stringify(currentdb, null, 2), (err) => {
  
    });
    
  })


  res.send('Received your updatedRow, it has been judged.');
});

app.post('/new-row', (req, res) => {
  const newRow = req.body;
  console.log('Got updated row from client:', newRow);

  fs.readFile('database/demo/data.txt', 'utf8', (err, data) => {
    const currentdb = JSON.parse(data);
    console.log(currentdb)
    currentdb.push(newRow)
    console.log(currentdb)

    fs.writeFile('database/demo/data.txt', JSON.stringify(currentdb, null, 2), (err) => {
  
    });

  })

  res.send('Received your updatedRow, it has been judged.');
});



app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});


