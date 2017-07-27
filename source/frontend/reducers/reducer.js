import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import Persons from '../components/person/reducers';


export default combineReducers({
  Persons,
  form: formReducer,
});
