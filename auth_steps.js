"use strict";

module.exports.authStep1 = (req, res, next)=> {
   if (
        (typeof req.query.code === "undefined") &&
        (typeof req.query.state === "undefined")
    ) {

        let uuid = require('node-uuid'),
            state = uuid.v4(),
            url = 'https://github.com/login/oauth/authorize',
            client_id = process.env.APP_PUBLIC,
            redirect_uri = HOST_NAME,
            scope = 'read:org';

        req.session.auth_state = state;
        res.redirect(url +
            '?client_id=' + client_id +
            '&redirect_uri=' + redirect_uri +
            '&scope=' + scope +
            '&state=' + state);
        res.end();

    } else {
        return next();
    }
};

module.exports.authStep2 = (req, res, next)=> {
    if (
        (typeof req.session.auth_state !== "undefined") &&
        (typeof req.query.code !== "undefined") &&
        (typeof req.query.state !== "undefined") &&
        (req.session.auth_state == req.query.state)
    ) {

        request.post({
            url: 'https://github.com/login/oauth/access_token',
            headers: {
                'Accept': 'application/json'
            },
            form: {
                client_id: process.env.APP_PUBLIC,
                client_secret: process.env.APP_SECRET,
                code: req.query.code,
                state: req.query.state
            }
        }, (error, response, body)=> {
            if (!error && response.statusCode == 200) {
                let answer = JSON.parse(body);
                req.session.access_token = answer.access_token;
                req.session.scope = answer.scope;
                req.session.token_type = answer.token_type;
                res.redirect(HOST_NAME);
            } else {
                res.status(response.statusCode);
                res.end(error);
            }
        });
    } else {
        return next();
    }
}