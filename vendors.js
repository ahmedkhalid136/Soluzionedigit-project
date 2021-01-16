const path = require('path');
const express = require('express')
const socketio = require('socket.io')
const http = require('http')
const app = express()
const server =http.createServer(app)
const io =socketio(server);

const PORT = process.env.PORT || 3000;

