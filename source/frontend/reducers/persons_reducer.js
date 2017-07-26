import * as person from '../types/person';

const defaultState = {
  list: [],
};

export default function personsReducer(previousState = defaultState, action) {
  switch (action.type) {
    case person.CREATE_PERSON:
      break;
    case person.READ_PERSON:
      break;
    case person.UPDATE_PERSON:
      break;
    case person.DELETE_PERSON:
      break;
    default:
      return previousState;
  }
  return previousState;
}
