const express = require('express');
const http = require('http');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const server = http.createServer(app);
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.disable('x-powered-by');

let data = require('./data.json');

app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send('Вы сломали сервер!');
});

app.use((err, req, res, next) => {
  if (error instanceof ForbiddenError) {
    return res.status(403).send({
      status: 'forbidden',
      message: error.message,
    });
  }
});


let jsonfile = require('jsonfile');

let file = jsonfile.readFileSync('data.json');

app.get('/book', (req, res) => {
  res.status(200).type('text/plain')
  res.send(JSON.stringify(data, null, '\t'))
});

app.get('/book/:id', (req, res) => {
  res.status(200).type('text/plain')
  let id = req.params.id;
  res.send(JSON.stringify(data[id], null, '\t'));

});

app.put('/book/:id', function (req, res) {
  let id = req.params.id;
  let {name, data1, data2, author, year} = req.body;

  jsonfile.readFile('data.json', function (err, obj) {
    let fileObj = obj;
    fileObj[id].name = name;
    fileObj[id].data1 = data1;
    fileObj[id].data2 = data2;
    fileObj[id].author = author;
    fileObj[id].year = year;
    jsonfile.writeFile('data.json', fileObj, function (err) {
      if (err) throw err;
    });
    res.send(JSON.stringify(data[id], null, '\t'));
  });
});

app.post('/book', (req, res) => {
  if (!req.body) return res.sendStatus(400);
  const user = {
    id: file.length + 1,
    name: req.body.name,
    data1: req.body.data1,
    data2: req.body.data2,
    author: req.body.author,
    year: req.body.year,
  };
  jsonfile.readFile('data.json', (err, obj) => {
    if (err) throw err;
    let fileObj = obj;
    fileObj.push(user);
    jsonfile.writeFile('data.json', fileObj, (err) => {
      if (err) throw err;
    });
    res.send(JSON.stringify(data, null, '\t'));
  });
});

app.delete('/book/:id', (req, res) => {
  jsonfile.readFile('data.json', (err, obj) => {
    if (err) throw err;
    let fileObj = obj;
    for (let i = 0; i < fileObj.length; i++) {
      if (fileObj[i].id == req.params.id) {
        fileObj.splice(i, 1);
      }
    }
    jsonfile.writeFile('data.json', fileObj, { spaces: 2 }, (err) => {
      if (err) throw err;
    });
    res.send(JSON.stringify(data, null, '\t'));
  });
});

//Go the SERVERs
server.listen(port, () => {
  console.log('\x1b[35m%s\x1b[0m', `The server is running on the port ${port}`);
  console.log('\x1b[32m%s\x1b[0m', `http://localhost:${port}/`);
  // console.log(`Worker ${cluster.worker.id} launched`);
});
