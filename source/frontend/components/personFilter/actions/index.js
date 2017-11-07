import { PERSON_FILTER_BY_NAME, PERSON_FILTER_TEAM, PERSON_FILTER_NO_TEAM } from '../types';

export function filterByName(name) {
  return {
    type: PERSON_FILTER_BY_NAME,
    payload: {
      name,
    },
  };
}

export function filterTeam(team) {
  return {
    type: PERSON_FILTER_TEAM,
    payload: {
      team,
    },
  };
}


export function filterNoTeam(team) {
  return {
    type: PERSON_FILTER_NO_TEAM,
    payload: {
      team,
    },
  };
}
