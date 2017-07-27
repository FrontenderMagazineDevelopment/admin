import * as person from '../types';

const defaultState = {
  list: [],
};

export default function personsReducer(previousState = defaultState, action) {
  console.log('reducer: ', arguments);
  return previousState;
  switch (action.type) {
    case person.PERSON_CREATE:
      break;
    case person.PERSON_READ:
      break;
    case person.PERSON_UPDATE:
      break;
    case person.PERSON_DELETE:
      break;
    default:
      return previousState;
  }
  return previousState;
}
