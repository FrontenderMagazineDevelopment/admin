import { call, fork, put, takeEvery } from 'redux-saga/effects';
import UserService from '@frontender-magazine/fm-user';
import * as actions from '../actions';
import * as person from '../types';



export function* readPersons() {
  try {
    const data = yield call((async () => {
      const User = new UserService('https://user.frontender.info/');
      const list = await User.get();
      return list;
    }));
    yield put(actions.readSuccess(data));
  } catch (error) {
    yield put(actions.readFailure(error));
  }
}

export function* watchReadPersons() {
  yield takeEvery(person.PERSON_READ_REQUEST, readPersons);
}

export function* removePerson(action) {
  try {
    yield call((async () => {
      const User = new UserService('https://user.frontender.info/');
      return User.delete(action.payload.id);
    }));
    yield put(actions.removeSuccess(action.payload.id));
  } catch (error) {
    yield put(actions.removeFailure(error));
  }
}

export function* watchRemovePerson() {
  yield takeEvery(person.PERSON_DELETE_REQUEST, removePerson);
}


export function* createPerson(action) {
  try {
    const data = yield call((async () => {
      const newPerson = action.payload.inputValues;
      const User = new UserService('https://user.frontender.info/');
      return User.post(newPerson);
    }));
    yield put(actions.createSuccess(data));
  } catch (error) {
    yield put(actions.createFailure(error));
  }
}


export function* watchCreatePerson() {
  yield takeEvery(person.PERSON_CREATE_REQUEST, createPerson);
}


export function* updatePerson(action) {
  try {
    const personToUpdate = action.payload.person;
    yield call((async () => {
      const User = new UserService('https://user.frontender.info/');
      return User.put(personToUpdate);
    }));
    yield put(actions.updateSuccess(personToUpdate));
  } catch (error) {
    yield put(actions.updateFailure(error));
  }
}

export function* watchUpdatePerson() {
  yield takeEvery(person.PERSON_UPDATE_REQUEST, updatePerson);
}


export function* searchPerson(action) {
  try {
    const data = yield call((async () => {
      const keywords = action.payload.keywords;
      await fetch(`http://service.frontender.info/autofill/${encodeURIComponent(JSON.stringify(keywords))}`)
        .then(response => response.json());
    }));
    yield put(actions.searchSuccess(data));
  } catch (error) {
    yield put(actions.searchFailure(error));
  }
}


export function* watchSearchPerson() {
  yield takeEvery(person.PERSON_SEARCH_REQUEST, searchPerson);
}


export function* rootSaga() {
  yield [
    fork(watchReadPersons),
    fork(watchRemovePerson),
    fork(watchCreatePerson),
    fork(watchUpdatePerson),
    fork(watchSearchPerson),
  ];
}
