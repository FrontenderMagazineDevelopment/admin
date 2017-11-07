import React, { Component } from 'react';
import { Field, formValueSelector, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Icon from '../../icon/javascript/icon';
import store from '../../../stores/store';
import * as actions from '../actions';

import '../styles/index.css';

class PersonSearchForm extends Component {
  handleSubmit = async (event) => {
    event.preventDefault();
    const input = this.props.data;
    if (input.trim().length !== 0) {
      const keywords = input.split(',');
      keywords.forEach(element =>
        element.trim(),
      );
      await store.dispatch(actions.searchRequest(keywords))
        .then(() => {
          this.props.setFields(this.props.response);
        })
        .catch(() => {
        });
    }
    this.props.openForm();
  };


  render() {
    return (
      <form className="person person--search" onSubmit={e => this.handleSubmit(e)}>
        <Field
          tabIndex="0"
          className="person__textarea"
          name="data"
          type="textarea"
          component="textarea"
          placeholder="Что бы создать пользователя введите его имя, ники или адреса электропочты через запятую"
        />
        <button
          tabIndex="0"
          className="person__button person__button--search"
          type="submit"
        >
          <Icon icon="search" />
        </button>
      </form>);
  }
}


const selector = formValueSelector('personSearch');

function mapStateToProps(state) {
  return {
    response: state.personSearchReducer.response,
    data: selector(state, 'data'),
  };
}

export default connect(mapStateToProps)(reduxForm({
  form: 'personSearch',
  initialValues: {
    data: '',
  },
})(PersonSearchForm));


PersonSearchForm.propTypes = {
  openForm: PropTypes.func.isRequired,
};
