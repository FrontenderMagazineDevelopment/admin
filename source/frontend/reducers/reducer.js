import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { personSearchReducer, personsReducer } from '../components/person/reducers';
import personsFilterReducer from '../components/personFilter/reducers';


export default combineReducers({
  personsReducer,
  personsFilterReducer,
  personSearchReducer,
  form: formReducer,
});
