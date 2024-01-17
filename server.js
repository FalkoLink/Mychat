const express = require('express');
const { Server } = require("socket.io");
const path = require('path');


const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.static(path.join(__dirname, "public")));

app.get('/', (req, res) => {
  res.send('hi');
});
app.get('/echo', (req, res) => {
  const input = req.query.input || '';
	console.log(input);
  const normal = input;
  const shouty = input.toUpperCase();
  const charCount = input.length;
  const backwards = input.split('').reverse().join('');

  res.json({ normal, shouty, charCount, backwards });
});
app.get('/json', (req, res) => {
  res.json({ text: 'hi', numbers: [1, 2, 3] });
});
app.get('/chat', (req, res) => {
  res.sendFile(path.join(__dirname, "chat.html"));
});
app.get('/sse', (req, res) => {
  res.sendFile(path.join(__dirname, "client.html"));
});

const expressServer = app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})

const io = new Server(expressServer, {
    cors: {
        origin: process.env.NODE_ENV === "production" ? false : ["http://localhost:5500", "http://127.0.0.1:5500"]
    }
})

io.on('connection', socket => {
    console.log(`User ${socket.id} connected`)

    socket.on('message', data => {
        console.log(data)
        io.emit('message', `${socket.id.substring(0, 5)}: ${data}`)
    })
})