const express = require("express");
const app = express();
const routes = require("./routes");
const path = require('path');
const { body, validationResult } = require('express-validator')
const socketio = require('socket.io')
const http = require('http')
const generatemessage = require('./utils/messages')
const server = http.createServer(app)
const io = socketio(server);
const PORT = process.env.PORT || 3000;
const bodyParser = require("body-parser");

app.use(routes);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Testing for / Route
app.get("/", function (req, res) {
  res.send("<h1>Hello World</h1>")
});

// app.post(
//   '/user',
//   // username must be an email
//   body('username').isEmail(),
//   // password must be at least 5 chars long
//   body('password').isLength({ min: 5 }),
//   (req, res) => {
//     // Finds the validation errors in this request and wraps them in an object with handy functions
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     User.create({
//       username: req.body.username,
//       password: req.body.password,
//     }).then(user => res.json(user));
//   },
// );
// //when the connection has been made
// io.on('connection', (socket) => {
//   socket.on('join', ({ user, room }, callback) => {

//   })




// })










app.listen(PORT, () => {
  console.log("Server is running on Port " + PORT);
});