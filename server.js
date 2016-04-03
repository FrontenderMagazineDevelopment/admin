"use strict";

const   HOST_NAME = 'admin.frontender.info',
        ENV_PATH = '../.env',
        PORT = 3000;

const compression = require('compression'),
      body_parser = require('body-parser'),
      session = require('express-session'),
      connect = require('connect'),
      request = require('request'),
      dotenv = require('dotenv'),
      path = require('path'),
      http = require('http'),
      fs = require('fs'),
      authStep1 = require('./auth_steps.js').authStep1, 
      authStep2 = require('./auth_steps.js').authStep2,
      app = connect();

if (!fs.existsSync(ENV_PATH)) throw new Error('Envirnment files not found');
dotenv.config({path: ENV_PATH});

const SESSION_OPTIONS = {
        resave: true,
        saveUninitialized: true,
        secret: [process.env.APP_PUBLIC, process.env.APP_SECRET]
    };

// Check host
app.use((req, res, next) => {
    if (req.headers.host === HOST_NAME) return next();
    res.status(401).end();
});

// Service middleware 
app.use(session(SESSION_OPTIONS));
app.use(compression());
app.use(body_parser.urlencoded({ extended: true }));

// Auth
app.use(authStep1);
app.use(authStep2);

// Show static
app.use((req, res, next) => {
    res.status(200).end('You are authorized.');
});

// Start server
http.createServer(app).listen(PORT);

