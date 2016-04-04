"use strict";

const HOST_NAME = 'admin.frontender.info';

module.exports.authStep1 = (request, response, next)=> {

   if (
        (typeof request.session.access_token == "undefined") &&
        (typeof request.query.code === "undefined") &&
        (typeof request.query.state === "undefined")
    ) {

        let uuid = require('node-uuid'),
            state = uuid.v4(),
            url = 'https://github.com/login/oauth/authorize',
            client_id = process.env.APP_OPEN,
            redirect_uri = HOST_NAME,
            scope = 'read:org';

        request.session.auth_state = state;
        response.writeHead(302, {location: url +
            '?client_id=' + client_id +
            '&redirect_uri=http://' + redirect_uri +
            '&scope=' + scope +
            '&state=' + state});
        response.end();

    } else {
        next();
    }
};

module.exports.authStep2 = (request, response, next)=> {
    if (
        (typeof request.session.access_token == "undefined") &&
        (typeof request.session.auth_state !== "undefined") &&
        (typeof request.query.code !== "undefined") &&
        (typeof request.query.state !== "undefined") &&
        (request.session.auth_state == request.query.state)
    ) {

        require('request').post({
            url: 'https://github.com/login/oauth/access_token',
            headers: {
                'Accept': 'application/json'
            },
            form: {
                client_id: process.env.APP_OPEN,
                client_secret: process.env.APP_SECRET,
                code: request.query.code,
                state: request.query.state
            }
        }, function (error, res, body) {
            if (!error && res.statusCode == 200) {
                let answer = JSON.parse(body);
                request.session.access_token = answer.access_token;
                request.session.scope = answer.scope;
                request.session.token_type = answer.token_type;
                response.writeHead(302, {location: '/'});
                response.end();
            } else {
                response.writeHead(response.statusCode);
                response.end(error);
            }
        });
    
    } else {
        next();
    }
}