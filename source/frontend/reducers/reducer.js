import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import Persons from './persons_reducer';


export default combineReducers({
  Persons,
  form: formReducer,
});
