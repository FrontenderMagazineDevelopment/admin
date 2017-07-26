import config from 'config.js';

/**
 * Services
 * @class
 * @namespace Services
 */
export default class Services {

  /**
   * @typedef GithubUserAnswer
   * @property {Bool}   success True if user with this login was found
   * @property {Object} payload Github user object
   */

  /**
   * Get GitHub user by login if there is such user
   * @public
   * @function
   * @param  {String} login              Github login
   * @return {Promise<GithubUserAnswer>} Promise wich will resolve with object
   */
  static async getGithubUser(login) {
    const response = await fetch(`${config.servicesURL}github/check/${login}?${Math.random()}`);
    const json = await response.json();
    return json;
  }

  /**
   * @typedef TwitterUserAnswer
   * @property {Bool}   success True if user with this login was found
   * @property {Object} payload Twitter user object
   */

  /**
   * Get Twitter user by login if there is such user
   * @public
   * @function
   * @param  {String} login               Twitter login
   * @return {Promise<TwitterUserAnswer>} Promise wich will resolve with object
   */
  static async getTwitterUser(login) {
    const response = await fetch(`${config.servicesURL}twitter/check/${login}?${Math.random()}`);
    const json = await response.json();
    return json;
  }

  /**
   * @typedef TrelloUserAnswer
   * @property {Bool}   success True if user with this login was found
   * @property {Object} payload Twitter user object
   */

  /**
   * Get Trello user by login if there is such user
   * @public
   * @function
   * @param  {String} login              Trello login
   * @return {Promise<TrelloUserAnswer>} Promise wich will resolve with object
   */
  static async getTrelloUser(login) {
    const response = await fetch(`${config.servicesURL}trello/check/${login}?${Math.random()}`);
    const json = await response.json();
    return json;
  }


  /**
   * @typedef URLAnswer
   * @property {Bool}   success True if URL answer with status 200
   * @property {Object} payload Empty object
   */

  /**
   * Check is URL answering
   * @public
   * @function
   * @param  {String} login       Trello login
   * @return {Promise<URLAnswer>} Promise wich will resolve with object
   */
  static async checkURL(url) {
    const response = await fetch(`${config.servicesURL}url/check/${encodeURIComponent(url)}?${Math.random()}`);
    const json = await response.json();
    return json;
  }
}
