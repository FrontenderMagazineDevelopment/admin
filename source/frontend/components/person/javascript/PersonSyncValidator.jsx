export default function PersonSyncValidator(values) {
  const errors = {};
  const urlRegularExpression = /(https?:)?\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,}/;
  const emailRegularExpression = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


  if (!values.name) {
    errors.name = 'Обязательное поле';
  }

  if ((values.avatar) && (!urlRegularExpression.test(values.avatar))) {
    errors.avatar = 'Странный формат URL';
  }

  if ((values.github) && (!urlRegularExpression.test(values.github))) {
    errors.github = 'Странный формат URL';
  }

  if ((values.twitter) && (!urlRegularExpression.test(values.twitter))) {
    errors.twitter = 'Странный формат URL';
  }

  if ((values.trello) && (!urlRegularExpression.test(values.trello))) {
    errors.trello = 'Странный формат URL';
  }

  if ((values.blog) && (!urlRegularExpression.test(values.blog))) {
    errors.blog = 'Странный формат URL';
  }

  if ((values.email) && (!emailRegularExpression.test(values.email))) {
    errors.email = 'Странный формат email';
  }

  if ((values.team === true) && (!values.github)) {
    errors.github = 'Обязательное поле для пользователя в команде';
  }


  return errors;
}
