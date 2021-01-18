const express = require("express");
const app = express();
const routes = require("./routes");
const path = require('path');
const expressValidator = require('express-validator')
const socketio = require('socket.io')
const http = require('http')
const server = http.createServer(app)
const io = socketio(server);
const PORT = process.env.PORT || 3000;

app.use(routes);

// Testing for / Route
app.get("/", function (req, res) {
    res.send("<h1>Hello World</h1>")
});

app.listen(3000, () => {
    console.log("Server is running on Port " + PORT);
});