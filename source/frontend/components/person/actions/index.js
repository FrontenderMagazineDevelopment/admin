import { WAIT_FOR_ACTION, ERROR_ACTION } from 'redux-wait-for-action';
import * as actions from '../types';


export function createRequest(inputValues) {
  return {
    type: actions.PERSON_CREATE_REQUEST,
    payload: {
      inputValues,
    },
    [WAIT_FOR_ACTION]: actions.PERSON_CREATE_SUCCESS,
    [ERROR_ACTION]: actions.PERSON_CREATE_FAILURE,
  };
}

export function createSuccess(person) {
  return {
    type: actions.PERSON_CREATE_SUCCESS,
    payload: {
      person,
    },
  };
}

export function createFailure(error) {
  return {
    type: actions.PERSON_CREATE_FAILURE,
    error: true,
    payload: {
      error,
    },
  };
}


export function readRequest() {
  return {
    type: actions.PERSON_READ_REQUEST,
    [WAIT_FOR_ACTION]: actions.PERSON_READ_SUCCESS,
    [ERROR_ACTION]: actions.PERSON_READ_FAILURE,
  };
}

export function readSuccess(response) {
  return {
    type: actions.PERSON_READ_SUCCESS,
    payload: {
      response,
    },
  };
}

export function readFailure(error) {
  return {
    type: actions.PERSON_READ_FAILURE,
    error: true,
    payload: {
      error,
    },
  };
}


export function updateRequest(person) {
  return {
    type: actions.PERSON_UPDATE_REQUEST,
    payload: {
      person,
    },
    [WAIT_FOR_ACTION]: actions.PERSON_UPDATE_SUCCESS,
    [ERROR_ACTION]: actions.PERSON_UPDATE_FAILURE,
  };
}


export function updateSuccess(person) {
  return {
    type: actions.PERSON_UPDATE_SUCCESS,
    payload: {
      person,
    },
  };
}

export function updateFailure(error) {
  return {
    type: actions.PERSON_UPDATE_FAILURE,
    error: true,
    payload: {
      error,
    },
  };
}

export function removeRequest(id) {
  return {
    type: actions.PERSON_DELETE_REQUEST,
    payload: {
      id,
    },
    [WAIT_FOR_ACTION]: actions.PERSON_DELETE_SUCCESS,
    [ERROR_ACTION]: actions.PERSON_DELETE_FAILURE,
  };
}

export function removeSuccess(id) {
  return {
    type: actions.PERSON_DELETE_SUCCESS,
    payload: {
      id,
    },
  };
}

export function removeFailure(error) {
  return {
    type: actions.PERSON_DELETE_FAILURE,
    error: true,
    payload: {
      error,
    },
  };
}


export function searchRequest(keywords) {
  return {
    type: actions.PERSON_SEARCH_REQUEST,
    payload: {
      keywords,
    },
    [WAIT_FOR_ACTION]: actions.PERSON_SEARCH_SUCCESS,
    [ERROR_ACTION]: actions.PERSON_SEARCH_FAILURE,
  };
}


export function searchSuccess(response) {
  return {
    type: actions.PERSON_SEARCH_SUCCESS,
    payload: {
      response,
    },
  };
}

export function searchFailure(error) {
  return {
    type: actions.PERSON_SEARCH_FAILURE,
    error: true,
    payload: {
      error,
    },
  };
}

