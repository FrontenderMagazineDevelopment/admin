import Services from '../../../api/services';

export default function PersonAsyncValidator(values, dispatch, props, changed) {
  const errors = props.asyncErrors || {};

  return new Promise(async (resolve, reject) => {
    let answer;
    let message;

    switch (changed) {
      case 'github':
        answer = await Services.getGithubUser(values[changed]);
        message = 'I can not found user on github';
        break;
      case 'twitter':
        answer = await Services.getTwitterUser(values[changed]);
        message = 'I can not found user on twitter';
        break;
      case 'trello':
        answer = await Services.getTrelloUser(values[changed]);
        message = 'I can not found user on trello';
        break;
      case 'blog':
        answer = await Services.checkURL(values[changed]);
        message = 'URL is not answering';
        break;
      default:
        break;
    }

    if (answer && answer.success) {
      delete errors[changed];
    } else {
      errors[changed] = message;
    }

    if (Object.keys(errors).length === 0 && errors.constructor === Object) resolve();
    reject(errors);
  });
}
