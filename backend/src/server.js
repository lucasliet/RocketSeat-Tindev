const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');

const server = express();

mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-ra5yn.mongodb.net/omnistack8?retryWrites=true&w=majority', {
    useNewUrlParser: true
});

server.use(express.json());
server.use(routes);

server.listen(3333);