import React, { Component } from 'react';
import { Field, reduxForm, reducer as formReducer } from 'redux-form';
import { PersonSyncValidator, PersonAsyncValidator } from './PersonValidator';
import Icon from '../../icon/javascript/icon';
import PropTypes from 'prop-types';

import '../styles/Person.css';

const Actions = require('../../../actions/person_actions');

class PersonForm extends Component {

  render() {
    const { valid, handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <form className="person person--search" onSubmit={handleSubmit}>
        <Field tabIndex="1" className="person__textarea" required name="data" component="textarea" placeholder="Что бы создать пользователя введите его имя, ники или адреса электропочты через запятую" />
        <button tabIndex="2" disabled={pristine || submitting} className="person__button person__button--search" type="submit">
          <Icon icon="search" />
        </button>
      </form>);
  }
}

PersonForm.contextTypes = {
  store: PropTypes.object,
};

export default reduxForm({
  form: 'person',
  validate: PersonSyncValidator,
  asyncValidate: PersonAsyncValidator,
  asyncBlurFields: ['name', 'picture'],
})(PersonForm);
