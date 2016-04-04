"use strict";

const   HOST_NAME = 'admin.frontender.info',
        ENV_PATH = '../.env',
        PORT = 3000;

const compression = require('compression'),
      body_parser = require('body-parser'),
      cookie_parser = require('cookie-parser'),
      query = require('./source/connect-query/connect-query.js'),
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
        secret: process.env.APP_SECRET
    };

// Check host
app.use(function(request, responce, next) {
    if (request.headers.host === HOST_NAME) return next();
    responce.writeHead(401);
    responce.end();
});

// Service middleware 
app.use(compression());
app.use(query());
app.use(cookie_parser('secret'));
app.use(session(SESSION_OPTIONS));
app.use(body_parser.urlencoded({ extended: true }));
app.use(body_parser.json());

// Auth
app.use(authStep1);
app.use(authStep2);

// Show static
app.use(function(request, responce, next) {
    responce.writeHead(200);
    responce.write('You are authorized.');
    responce.end();
});

// Start server
http.createServer(app).listen(PORT);

