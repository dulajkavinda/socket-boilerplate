const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

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
  socket.on("message", ({ name, message }) => {
    io.emit("message", { name, message });
  });
});

const PORT = process.env.PORT || 4000;

http.listen(PORT, () => {
  console.log("Server is up and running on port numner " + PORT);
});
