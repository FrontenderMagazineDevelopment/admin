export default function PersonSyncValidator(values) {
  const errors = {};
  const urlRegularExpression = /(https?:)?\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,}/;

  if (!values.name) {
    errors.name = 'Обязательное поле';
  }

  if (!values.picture) {
    errors.picture = 'Обязательное поле';
  } else if (!urlRegularExpression.test(values.picture)) {
    errors.picture = 'Странный формат URL';
  }

  return errors;
}
