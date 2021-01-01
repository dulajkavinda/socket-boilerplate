const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { emit } = require("process");

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  socket.broadcast.emit("user.events", "Someone has joined");
  socket.on("name", (name) => {
    console.log(name + " says hello!");
    socket.broadcast.emit("name", name);
  });
  socket.on("disconnect", () => {
    console.log("User disconnected");
    socket.broadcast.emit("user.events", "User disconnected");
  });
});

const PORT = process.env.PORT || 4000;

http.listen(PORT, () => {
  console.log("Server is up and running on port numner " + PORT);
});
