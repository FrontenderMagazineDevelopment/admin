"use strict";

const ORG_NAME = 'FrontenderMagazine';

module.exports.getUserInformation = (request, response, next)=> {
    if (typeof request.session.access_token == "undefined") {
        responce.writeHead(401);
        return responce.end();
    }

    if (typeof request.session.user !== "undefined") return next();

    require('request').get({
        url: 'https://api.github.com/user?access_token='+request.session.access_token,
        headers: {
            'Accept': 'application/json',
            'User-Agent': 'Frontender Magazine Admin'
        }
    }, function (error, res, body) {
        if (!error && res.statusCode == 200) {        
            let answer = JSON.parse(body);
            request.session.user = answer;
            return next();
        
        } else {
            response.writeHead(response.statusCode);
            response.end(error);
        }
    });
}

module.exports.isInOrganization = (request, response, next)=> {
    

    if (
        (typeof request.session.access_token == "undefined") ||
        (typeof request.session.user == "undefined")
    ){
        responce.writeHead(401);
        return responce.end();
    }

    if ((typeof request.session.inOrganization !== "undefined") && (request.session.inOrganization === true)) return next();

    require('request').get({
        url: 'https://api.github.com/orgs/' + ORG_NAME + '/members/' + request.session.user.login + '?access_token='+request.session.access_token,
        headers: {
            'Accept': 'application/json',
            'User-Agent': 'Frontender Magazine Admin'
        }
    }, function (error, res, body) {
        console.log('code: ', res.statusCode);
        console.log('inOrganization: ', body);

        if (!error && res.statusCode == 200) {    

            let answer = JSON.parse(body);

            return next();
        
        } else {
            response.writeHead(response.statusCode);
            response.end(error);
        }
    });
}