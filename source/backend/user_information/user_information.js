

const ORG_NAME = 'FrontenderMagazine';
const EDITOR_TEAM = 'Editor';
const TRANSLATORS_TEAM = 'Translator';
const AUTHOR_TEAM = 'Author';

module.exports.getUserInformation = (request, response, next) => {
  request.session.access_token = request.session.access_token || process.env.TOKEN;

  console.log('token:', request.session.access_token);

  if (typeof request.session.access_token === 'undefined') {
    console.log('getUserInformation');
    response.writeHead(401);
    return response.end();
  }

  if (typeof request.session.user !== 'undefined') return next();

  require('request').get({
    url: `https://api.github.com/user?access_token=${request.session.access_token}`,
    headers: {
      Accept: 'application/json',
      'User-Agent': 'Frontender Magazine Admin',
    },
  }, function (error, res, body) {
    console.log(arguments);

    if (!error && res.statusCode == 200) {
      const answer = JSON.parse(body);
      request.session.user = answer;
      return next();
    }
    response.writeHead(response.statusCode);
    response.end(error);
  });
};

module.exports.isInOrganization = (request, response, next) => {
  if (
        (typeof request.session.access_token === 'undefined') ||
        (typeof request.session.user === 'undefined')
    ) {
    console.log('isInOrganization');
    response.writeHead(401);
    return response.end();
  }

  if ((typeof request.session.inOrganization !== 'undefined') && (request.session.inOrganization === true)) return next();

  require('request').get({
    url: `https://api.github.com/orgs/${ORG_NAME}/members/${request.session.user.login}?access_token=${request.session.access_token}`,
    headers: {
      Accept: 'application/json',
      'User-Agent': 'Frontender Magazine Admin',
    },
  }, (error, res, body) => {
    request.session.inOrganization = (res.statusCode == 204);
    if (request.session.inOrganization === true) return next();

    response.writeHead(401, { 'Content-Type': 'text/html; charset=utf-8' });
    response.write('Вы не член!');
    return response.end();
  });
};

module.exports.getTeams = (request, response, next) => {
  if (
        (typeof request.session.access_token === 'undefined') ||
        (typeof request.session.user === 'undefined') ||
        (typeof request.session.inOrganization === 'undefined') ||
        (request.session.inOrganization === false)
    ) {
    console.log('getTeams');
    response.writeHead(401);
    return response.end();
  }

  if (typeof request.session.teams !== 'undefined') return next();

  require('request').get({
    url: `https://api.github.com/user/teams?access_token=${request.session.access_token}`,
    headers: {
      Accept: 'application/json',
      'User-Agent': 'Frontender Magazine Admin',
    },
  }, (error, res, body) => {
    if (!error && res.statusCode == 200) {
      const answer = JSON.parse(body);
      request.session.teams = answer;
      return next();
    }
    response.writeHead(response.statusCode);
    response.end(error);
  });
};

function checkTeam(team_name, organization_name) {
  for (team of request.session.teams) {
    if (team.name === team_name && team.organization.login === organization_name) return true;
  }
  return false;
}

module.exports.isTranslator = (request, response, next) => checkTeam(TRANSLATORS_TEAM, ORG_NAME);

module.exports.isEditor = (request, response, next) => checkTeam(EDITOR_TEAM, ORG_NAME);

module.exports.isAuthor = (request, response, next) => checkTeam(AUTHOR_TEAM, ORG_NAME);
