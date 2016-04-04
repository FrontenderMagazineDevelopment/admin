"use strict";

const   HOST_NAME = 'admin.frontender.info',
        ENV_PATH = '../.env',
        PORT = 3000;

const compression = require('compression'),
      body_parser = require('body-parser'),
      cookie_parser = require('cookie-parser'),
      query = require('./source/backend/connect-query/connect-query.js'),
      session = require('express-session'),
      connect = require('connect'),
      dotenv = require('dotenv'),
      path = require('path'),
      http = require('http'),
      fs = require('fs'),
      authStep1 = require('./source/backend/auth_steps/auth_steps.js').authStep1, 
      authStep2 = require('./source/backend/auth_steps/auth_steps.js').authStep2,
      getUserInformation = require('./source/backend/user_information/user_information.js').getUserInformation,
      isInOrganization = require('./source/backend/user_information/user_information.js').isInOrganization,
      getTeams = require('./source/backend/user_information/user_information.js').getTeams,
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

// Autentification and autorization
app.use(authStep1);
app.use(authStep2);
app.use(getUserInformation);
app.use(isInOrganization);
app.use(getTeams);

// Show static
app.use(function(request, responce, next) {
    responce.writeHead(200);
    responce.write('You are authorized.');
    responce.end();
});

// Start server
http.createServer(app).listen(PORT);

