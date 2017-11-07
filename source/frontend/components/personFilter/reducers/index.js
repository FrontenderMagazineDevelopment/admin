import * as person from '../types';

const defaultState = {
  filterByName: '',
  team: true,
  noTeam: true,
};

export default function personsFilterReducer(previousState = defaultState, action) {
  switch (action.type) {
    case person.PERSON_FILTER_BY_NAME:
      return Object.assign({}, previousState, {
        filterByName: action.payload.name,
      });


    case person.PERSON_FILTER_TEAM:
      return Object.assign({}, previousState, {
        team: action.payload.team,
      });

    case person.PERSON_FILTER_NO_TEAM:
      return Object.assign({}, previousState, {
        noTeam: action.payload.team,
      });

    default:return previousState;
  }
}
