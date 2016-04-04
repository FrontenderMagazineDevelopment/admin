"use strict";

module.exports.getUserInformation = (request, response, next)=> {
    if (typeof request.session.access_token == "undefined") {
        responce.writeHead(401);
        return responce.end();
    }

    if (typeof request.session.user !== "undefined") return next();

    require('request').get({
        url: 'https://api.github.com/user',
        headers: {
            'Accept': 'application/json'
        },
        form: {
            access_token: request.session.access_token
        }
    }, function (error, res, body) {
        if (!error && res.statusCode == 200) {
            let answer = JSON.parse(body);
            console.log('user: ', answer);
            request.session.user = answer;
            return next();
        } else {
            response.writeHead(response.statusCode);
            response.end(error);
        }
    });
}
