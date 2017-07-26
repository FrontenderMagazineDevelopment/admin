import React, { Component } from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import PropTypes from 'prop-types';
import PersonSyncValidator from './PersonSyncValidator';
import PersonAsyncValidator from './PersonAsyncValidator';
import renderField from './PersonField';
import renderCheckboxField from './PersonCheckboxField';
import Icon from '../../icon/javascript/icon';

import '../sprite-icons/author.svg';
import '../sprite-icons/blog.svg';
import '../sprite-icons/book.svg';
import '../sprite-icons/close.svg';
import '../sprite-icons/delete.svg';
import '../sprite-icons/developer.svg';
import '../sprite-icons/dot.svg';
import '../sprite-icons/edit.svg';
import '../sprite-icons/editor.svg';
import '../sprite-icons/email.svg';
import '../sprite-icons/empty.svg';
import '../sprite-icons/github.svg';
import '../sprite-icons/plus.svg';
import '../sprite-icons/save.svg';
import '../sprite-icons/search.svg';
import '../sprite-icons/team.svg';
import '../sprite-icons/translator.svg';
import '../sprite-icons/trello.svg';
import '../sprite-icons/twitter.svg';

import '../styles/Person.css';


class PersonForm extends Component {

  setAvatarPreview = (element) => {
    this.avatarPreview = element;
  }

  avatarURLChange = (event) => {
    if (event.currentTarget.getAttribute('data-invalid') === 'true') return;
    console.log('passed');
    this.avatarPreview.setAttribute('src', event.currentTarget.value);
    console.log(this.avatarPreview, event.currentTarget.value);
    this.avatarPreview.classList.toggle('person__avatarPreview--loaded', false);
    this.avatarPreview.classList.toggle('person__avatarPreview--errored', false);
  }

  setAvatarLoaded = () => {
    this.avatarPreview.classList.toggle('person__avatarPreview--loaded', true);
    this.avatarPreview.classList.toggle('person__avatarPreview--errored', false);
    console.log('avatar loaded');
  }

  setAvatarError = () => new Promise(function (resolve, reject) {
    const img = event.currentTarget;
    console.log('avatar errored');
    this.avatarPreview.classList.toggle('person__avatarPreview--loaded', false);
    this.avatarPreview.classList.toggle('person__avatarPreview--errored', true);
    const errors = {
      picture: 'Картинка не грузится',
    };
    reject(new SubmissionError(errors));
  })

  render() {
    const { valid, error, handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <form className="person person--form" onSubmit={handleSubmit} >
        <fieldset className="person__fieldset person__fieldset--person" >
          <div className="person__preview">
            <Icon icon="empty" className="icon person__empty" width={57} height={80} viewBox="0 0 58 80" />
            <img onError={this.setAvatarError} onLoad={this.setAvatarLoaded} ref={this.setAvatarPreview} className="person__avatarPreview" alt="avatar" />
          </div>
          <Field className="person__input" icon="dot" name="name" component={renderField} type="text" placeholder="Имя" />
          <Field stateLoaded={this.avatarPreview && this.avatarPreview.loaded} error="mammamia" invalid="true" onBlur={this.avatarURLChange} className="person__input" icon="dot" name="picture" component={renderField} type="url" placeholder="URL Аватара" />
        </fieldset>
        <fieldset className="person__fieldset person__fieldset--contacts">
          <Field className="person__input" icon="github" name="github" component={renderField} type="text" placeholder="GitHub" />
          <Field className="person__input" icon="twitter" name="twitter" component={renderField} type="text" placeholder="Twitter" />
          <Field className="person__input" icon="blog" name="blog" component={renderField} type="url" placeholder="Blog" />
          <Field className="person__input" icon="email" name="email" component={renderField} type="email" placeholder="Email" />
          <Field className="person__input" icon="trello" name="trello" component={renderField} type="email" placeholder="Trello" />
        </fieldset>
        <section className="person-form__fieldset person__fieldset--main">
          <Field name="is_team" id="is_team" component={renderCheckboxField} type="checkbox" label="В команде" />
          <Field name="is_core_team" id="is_core_team" component={renderCheckboxField} type="checkbox" label="За деньги" />
        </section>
        <section className="person-form__fieldset person__fieldset--role">
          <Field name="is_translator" id="is_translator" component={renderCheckboxField} type="checkbox" label="Переводчик" />
          <Field name="is_author" id="is_author" component={renderCheckboxField} type="checkbox" label="Автор" />
          <Field name="is_editor" id="is_editor" component={renderCheckboxField} type="checkbox" label="Редактор" />
          <Field name="is_developer" id="is_developer" component={renderCheckboxField} type="checkbox" label="Разработчик" />
        </section>
        <section className="person-form__fieldset person__fieldset--salary">
          <Field name="salary" id="salary" component={renderSalaryField} />
        </section>
        <fieldset className="person__fieldset person__fieldset--menu">
          <button className="person__button person__button--submit" type="submit" disabled={!valid || pristine || submitting}>
            <Icon icon="save" classList="icon--person" />
          </button>
          <button className="person__button person__button--close" type="button">
            <Icon icon="close" classList="icon--person" />
          </button>
        </fieldset>
      </form>);
  }
}

PersonForm.contextTypes = {
  store: PropTypes.object,
};

PersonForm.propTypes = {
  valid: PropTypes.bool.isRequired,
  error: PropTypes.string,
  handleSubmit: PropTypes.func,
  pristine: PropTypes.bool.isRequired,
  reset: PropTypes.func,
  submitting: PropTypes.bool.isRequired,
};

PersonForm.defaultProps = {
  handleSubmit: null,
  reset: null,
  error: undefined,
};

export default reduxForm({
  form: 'person',
  validate: PersonSyncValidator,
  asyncValidate: PersonAsyncValidator,
  asyncBlurFields: ['github', 'twitter', 'trello', 'email', 'blog'],
})(PersonForm);
