const http = require('http');
const url = require('url');

const server = http.createServer();

server.listen(3000, () => {
  console.log('The HTTP server is listening at Port 3000');
});

let messages = [
  { 'id': 1, 'user': 'Danerys Targaryen', 'message': 'Fire and blood!' },
  { 'id': 2, 'user': 'Jon Snow', 'message': 'Winter is coming.' },
  { 'id': 3, 'user': 'Cersei Lannister', 'message': 'Hear me roar!' }
]

server.on('request', (req, res) => {
  if (req.method === 'GET') {
    getAllMessages(res);
  } else if (req.method === 'POST') {
    let newMessage = { 'id': new Date() }

    req.on('data', (data) => {
      newMessage = Object.assign(newMessage, JSON.parse(data));
    });

    req.on('end', () => {
      addMessage(newMessage, res);
    })
  }
})

getAllMessages = (res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });

  res.write(JSON.stringify(messages));
  res.end();
}

addMessage = (newMessage, res) => {
  res.writeHead(201, { 'Content-Type': 'application/json' });

  res.write(JSON.stringify(newMessage));
  res.end();
}



