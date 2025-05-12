const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Serve everything in the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json()); // This is crucial. Without it, req.body = undefined sadness.



app.post('/index', (req, res) => {
  const deletedIndex = Number(req.body.deletedIndex);
  console.log('Received index:', deletedIndex);

  fs.readFile('public/data.txt', 'utf8', (err, data) => {
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

    fs.writeFile('public/data.txt', JSON.stringify(filteredData, null, 2), (err) => {
      res.sendStatus(204)
    });

  })
  
});

app.post('/update-row', (req, res) => {
  const updatedRow = req.body;
  console.log('Got updated row from client:', updatedRow);

  fs.readFile('public/data.txt', 'utf8', (err, data) => {
    const currentdb = JSON.parse(data);
    console.log(currentdb)
    console.log(updatedRow.index)
    const updatedIndex = currentdb.findIndex(obj => obj.index === Number(updatedRow.index))
    console.log('updated index: ', updatedIndex);
    currentdb[updatedIndex] = updatedRow;
    console.log(currentdb)

    fs.writeFile('public/data.txt', JSON.stringify(currentdb, null, 2), (err) => {
  
    });
    
  })


  // Do whatever: update your data.txt, yell at it, validate it, sacrifice it to the file system
  res.send('Received your updatedRow, it has been judged.');
});

app.post('/new-row', (req, res) => {
  const newRow = req.body;
  console.log('Got updated row from client:', newRow);

  fs.readFile('public/data.txt', 'utf8', (err, data) => {
    const currentdb = JSON.parse(data);
    console.log(currentdb)
    currentdb.push(newRow)
    console.log(currentdb)

    fs.writeFile('public/data.txt', JSON.stringify(currentdb, null, 2), (err) => {
  
    });

  })

  // Do whatever: update your data.txt, yell at it, validate it, sacrifice it to the file system
  res.send('Received your updatedRow, it has been judged.');
});



app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});


