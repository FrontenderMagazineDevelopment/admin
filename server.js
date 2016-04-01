"use strict";

const ENV_PATH = '../.env',
      PORT = 3000;

const compression = require('compression'),
      body_parser = require('body-parser'),
      session = require('express-session'),
      connect = require('connect'),
      github = require('octonode'),
      dotenv = require('dotenv'),
      path = require('path'),
      http = require('http'),
      fs = require('fs'),
      app = connect();

if (!fs.existsSync(ENV_PATH)) throw new Error('Envirnment files not found');
dotenv.config({path: ENV_PATH});

const SESSION_OPTIONS = {
        resave: true,
        saveUninitialized: true,
        secret: [process.env.APP_PUBLIC, process.env.APP_SECRET]
    };

app.use(session(SESSION_OPTIONS));
app.use(compression());
app.use(body_parser.urlencoded({ extended: true }));
app.use(function(req, res){
  res.end('Server up!\n');
});

http.createServer(app).listen(PORT);
