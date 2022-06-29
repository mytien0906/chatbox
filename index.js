const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

// Middleware
app.use(express.static(__dirname + "/public"));

// Router

app.get("/", (req, res) => {
  res.sendFile(__dirname + "./public/index.html");
});

let messages = [];

// Socket
io.on("connection", (socket) => {
    socket.emit("messages", messages);
  socket.on("message", (msg) => {
    messages.push(msg);
    io.emit("message", msg);
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
