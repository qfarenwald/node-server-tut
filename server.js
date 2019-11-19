// tutorial set up
const http = require("http");
const url = require('url');
const server = http.createServer();

server.listen(process.env.PORT || 3000, () => {
  console.log('The HTTP server is listening at Port 3000.');
});

// original server.on code the tutorial had me write, it works
// server.on('request', (request, response) => {
//   response.writeHead(200, { 'Content-Type': 'text/plain' });
//   response.write('Hello World\n');
//   response.end();
// });

// next server.on code the tutorial had me write to replace the original server.on code above, it needs the 2 functions below that I have to write to work
server.on('request', (request, response) => {
  if (request.method === 'GET') {
    getAllMessages(response);
  }

  else if (request.method === 'POST') {
    let newMessage = { 'id': 4, 'user': 'alex trebek', 'message': 'answer in the form of a question' };

    request.on('data', (data) => {
      newMessage = Object.assign(newMessage, JSON.parse(data));
    });

    request.on('end', () => {
      addMessage(newMessage, response);
    });
  }
});

// an array provided by the tutorial
// treat like a database
let messages = [
  { 'id': 1, 'user': 'brittany storoz', 'message': 'hi there!' },
  { 'id': 2, 'user': 'bob loblaw', 'message': 'check out my law blog' },
  { 'id': 3, 'user': 'lorem ipsum', 'message': 'dolor set amet' }
];

// function 1 I need to write
const getAllMessages = response => {
  response.writeHead(201, { 'Content-Type': 'text/plain' });
  response.write(JSON.stringify(messages));
  response.end();
}

// function 2 I need to write
const addMessage = (newMessage, response) => {
  messages.push(newMessage);
  response.writeHead(201, { 'Content-Type': 'text/plain' });
  response.write(JSON.stringify(newMessage));
  response.end();
}
