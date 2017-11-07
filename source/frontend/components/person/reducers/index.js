import * as person from '../types';

const defaultState = { persons: [], isError: false, error: {} };


export function personsReducer(previousState = defaultState, action) {
  switch (action.type) {
    case person.PERSON_CREATE_REQUEST:
      return previousState;
    case person.PERSON_CREATE_SUCCESS:
      if (action.payload.person === undefined) return previousState;
      return Object.assign({}, previousState, {
        persons: [...previousState.persons, action.payload.person],
        isError: false,
        error: {},
      });
    case person.PERSON_CREATE_FAILURE:
      return Object.assign({}, previousState, {
        isError: true,
        error: action.payload.error,
      });


    case person.PERSON_READ_REQUEST:
      return previousState;
    case person.PERSON_READ_SUCCESS:
      if (action.payload.response === undefined) return previousState;
      return Object.assign({}, previousState, {
        persons: action.payload.response,
        isError: false,
        error: {},
      });
    case person.PERSON_READ_FAILURE:
      return Object.assign({}, previousState, {
        isError: true,
        error: action.payload.error,
      });

    case person.PERSON_UPDATE_REQUEST:
      return previousState;
    case person.PERSON_UPDATE_SUCCESS:
      return Object.assign({}, previousState, {
        persons: previousState.persons.map((item) => {
          if (item._id !== action.payload.person._id) {
            return item;
          }
          return {
            ...item,
            ...action.payload.person,
          };
        }),
        isError: false,
        error: {},
      });

    case person.PERSON_UPDATE_FAILURE:
      return Object.assign({}, previousState, {
        isError: true,
        error: action.payload.error,
      });

    case person.PERSON_DELETE_REQUEST:
      return previousState;
    case person.PERSON_DELETE_SUCCESS:
      return Object.assign({}, previousState, {
        persons: previousState.persons.filter(element => element._id !== action.payload.id),
        isError: false,
        error: {},
      });


    case person.PERSON_DELETE_FAILURE:
      return Object.assign({}, previousState, {
        isError: true,
        error: action.payload.error,
      });

    default:
      return previousState;
  }
}

const state = { response: {}, isError: false, error: {} };


export function personSearchReducer(previousState = state, action) {
  switch (action.type) {
    case person.PERSON_SEARCH_REQUEST:
      return previousState;

    case person.PERSON_SEARCH_SUCCESS:
      if (action.payload.response === undefined) return previousState;
      return Object.assign({}, previousState, {
        response: action.payload.response,
        isError: false,
        error: {},
      });
    case person.PERSON_SEARCH_FAILURE:
      return Object.assign({}, previousState, {
        isError: true,
        error: action.payload.error,
      });

    default:
      return previousState;
  }
}
