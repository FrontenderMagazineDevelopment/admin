import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, formValueSelector, initialize, reduxForm, touch } from 'redux-form';
import PropTypes from 'prop-types';
import config from 'config.js';
import PersonSyncValidator from './PersonSyncValidator';
import PersonAsyncValidator from './PersonAsyncValidator';
import renderField from './PersonField';
import renderCheckboxField from './PersonCheckboxField';
import renderSalaryField from './PersonSalaryField';
import Icon from '../../icon/javascript/icon';
import store from '../../../stores/store';
import * as action from '../actions';


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


class PersonForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      team: this.props.team,
      core: this.props.core,
      avatar: this.props.avatar,
      savedInLocalStorage: this.props.savedInLocalStorage,
      errorMessage: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      team: nextProps.team,
      core: nextProps.core,
      avatar: nextProps.avatar,
      savedInLocalStorage: nextProps.savedInLocalStorage,
    });
  }


  setAvatarPreview = (element) => {
    this.avatarPreview = element;
  }

  setAvatarLoaded = () => {
    this.avatarPreview.classList.toggle('person__avatarPreview--loaded', true);
    this.avatarPreview.classList.toggle('person__avatarPreview--errored', false);
  }

  avatarURLChange = (event) => {
    if (event.currentTarget.getAttribute('data-invalid') === 'true') return;
    this.avatarPreview.setAttribute('src', event.currentTarget.value);
    this.avatarPreview.classList.toggle('person__avatarPreview--loaded', false);
    this.avatarPreview.classList.toggle('person__avatarPreview--errored', false);
  }

  showPersonPreview = () => {
    this.props.closeForm();
  }


  deletePerson = () => {
    if (confirm('Подтвердить удаление пользователя')) {
      store.dispatch(action.removeRequest(this.props.id))
        .then(() => {
        })
        .catch(() => {
          this.setState({ errorMessage: 'Ошибка сервера' });
          if (this.props.errorState.statusCode === 401) {
            document.location.href = `${config.tokenService}?to=${document.location.href}`;
          }
        });
    }
  }

  changeTeamState = () => {
    this.setState({ team: !this.state.team }, () => {
      if (!this.state.team) {
        this.setState({ core: false });
        this.props.change('translator', false);
        this.props.change('editor', false);
        this.props.change('author', false);
        this.props.change('developer', false);
        this.props.change('core', false);
      } else {
        store.dispatch(touch(this.props.form, 'github'));
      }
    });
  };


  changeCoreState = () => {
    this.setState({ core: !this.state.core }, () => {
      if (!this.state.core) {
        this.props.change('salary', 0);
      }
    });
  };

  handleSubmit = async (event, values) => {
    event.preventDefault();
    const fieldValues = Object.assign({}, values);
    Object.keys(fieldValues).forEach((key) => {
      if (fieldValues[key] === '' || fieldValues[key] === null || fieldValues[key] === undefined) {
        delete fieldValues[key];
      }
    });
    if (this.props.id !== null) {
      fieldValues._id = this.props.id;
      fieldValues.__v = this.props.v;
      store.dispatch(action.updateRequest(fieldValues))
        .then(() => {
          localStorage.removeItem(this.props.form);
          this.setState({ errorMessage: '', savedInLocalStorage: false });
        })
        .catch(() => {
          this.setState({ errorMessage: 'Ошибка сервера' });
          if (this.props.errorState.statusCode === 401) {
            document.location.href = `${config.tokenService}?url=${document.location.href}`;
            localStorage.setItem(this.props.form, JSON.stringify(fieldValues));
          }
        });
    } else {
      store.dispatch(action.createRequest(fieldValues))
        .then(() => {
          localStorage.removeItem(this.props.form);
          store.dispatch(initialize(this.props.form, {}, false));
          this.setState({ avatar: '', savedInLocalStorage: false });
        })
        .catch(() => {
          this.setState({ errorMessage: 'Ошибка сервера' });
          if (this.props.errorState.statusCode === 401) {
            document.location.href = `${config.tokenService}?to=${document.location.href}`;
            localStorage.setItem(this.props.form, JSON.stringify(fieldValues));
          }
        });
    }
  };


  render() {
    const { valid, pristine, submitting, formInputValues } = this.props;
    return (
      <form className="person person--form" onSubmit={e => this.handleSubmit(e, formInputValues)}>
        <fieldset className="person__fieldset person__fieldset--person">
          <div className="person__preview">
            <Icon icon="empty" className="icon person__empty" width={57} height={80} viewBox="0 0 58 80" />
            <img
              onLoad={this.setAvatarLoaded}
              ref={this.setAvatarPreview}
              className="person__avatarPreview"
              alt="avatar"
              src={this.state.avatar}
            />
          </div>
          <Field
            className="person__input"
            icon="dot"
            name="name"
            component={renderField}
            type="text"
            placeholder="Имя"
          />
          <Field
            stateLoaded={this.avatarPreview && this.avatarPreview.loaded}
            onBlur={this.avatarURLChange}
            className="person__input"
            icon="dot"
            name="avatar"
            component={renderField}
            type="url"
            placeholder="URL Аватара"
          />
        </fieldset>
        <fieldset className="person__fieldset person__fieldset--contacts">
          <Field
            className="person__input"
            icon="github"
            name="github"
            component={renderField}
            type="text"
            placeholder="GitHub"
          />
          <Field
            className="person__input"
            icon="twitter"
            name="twitter"
            component={renderField}
            type="text"
            placeholder="Twitter"
          />
          <Field
            className="person__input"
            icon="blog"
            name="blog"
            component={renderField}
            type="url"
            placeholder="Blog"
          />
          <Field
            className="person__input"
            icon="email"
            name="email"
            component={renderField}
            type="email"
            placeholder="Email"
          />
          <Field
            className="person__input"
            icon="trello"
            name="trello"
            component={renderField}
            type="email"
            placeholder="Trello"
          />
        </fieldset>
        <section className="person-form__fieldset person__fieldset--main">
          <Field
            onChange={this.changeTeamState}
            name="team"
            id="team"
            component={renderCheckboxField}
            type="checkbox"
            label="В команде"
          />
          <Field
            onChange={this.changeCoreState}
            name="core"
            disabled={!this.state.team}
            id="core"
            component={renderCheckboxField}
            type="checkbox"
            label="За деньги"
          />
        </section>
        <section className="person-form__fieldset person__fieldset--role">
          <Field
            disabled={!this.state.team}
            name="translator"
            id="translator"
            component={renderCheckboxField}
            type="checkbox"
            label="Переводчик"
          />
          <Field
            disabled={!this.state.team}
            name="author"
            id="author"
            component={renderCheckboxField}
            type="checkbox"
            label="Автор"
          />
          <Field
            disabled={!this.state.team}
            name="editor"
            id="editor"
            component={renderCheckboxField}
            type="checkbox"
            label="Редактор"
          />
          <Field
            disabled={!this.state.team}
            name="developer"
            id="developer"
            component={renderCheckboxField}
            type="checkbox"
            label="Разработчик"
          />
        </section>
        <fieldset
          disabled={!this.state.team || !this.state.core}
          className="person-form__fieldset person__fieldset--salary"
        >
          <Field name="salary" id="salary" parse={value => Number(value)} component={renderSalaryField} />
        </fieldset>
        <fieldset className="person__fieldset person__fieldset--menu">
          <button
            className="person__button person__button--submit"
            type="submit"
            disabled={!valid
            || !(!pristine || this.state.savedInLocalStorage)
            || submitting}
          >
            <Icon icon="save" classList="icon--person" width={20} height={20} />
          </button>
          <button className="person__button person__button--close" type="button" onClick={this.showPersonPreview}>
            <Icon icon="close" classList="icon--person" width={20} height={20} />
          </button>
          <button
            className="person__button person__button--delete"
            type="button"
            onClick={this.deletePerson}
          >
            <Icon icon="delete" classList="icon--person" width={20} height={20} />
          </button>
        </fieldset>
        <p className="person__error-message">{this.state.errorMessage}</p>
      </form>);
  }
}


function mapStateToProps(state, ownProps) {
  const selector = formValueSelector(ownProps.form);
  let initialValues = {};
  let savedInLocalStorage = false;
  const formStateFromLocalStorage = localStorage.getItem(ownProps.form);
  if (formStateFromLocalStorage !== null) {
    savedInLocalStorage = true;
    initialValues = JSON.parse(formStateFromLocalStorage);
  } else {
    initialValues = {
      name: ownProps.name,
      avatar: ownProps.avatar,
      twitter: ownProps.twitter,
      github: ownProps.github,
      blog: ownProps.blog,
      email: ownProps.email,
      trello: ownProps.trello,
      team: ownProps.team,
      core: ownProps.core,
      translator: ownProps.translator,
      developer: ownProps.developer,
      editor: ownProps.editor,
      author: ownProps.author,
      salary: ownProps.salary,
    };
  }
  return {
    form: ownProps.form,
    initialValues,
    formInputValues: selector(state, 'name', 'avatar', 'twitter', 'github', 'blog', 'email', 'trello', 'team',
      'core', 'translator', 'developer', 'editor', 'author', 'salary'),
    errorState: state.personsReducer.error,
    team: selector(state, 'team'),
    core: selector(state, 'core'),
    avatar: selector(state, 'avatar'),
    savedInLocalStorage,
  };
}


export default connect(mapStateToProps)(reduxForm({
  validate: PersonSyncValidator,
  asyncValidate: PersonAsyncValidator,
  asyncBlurFields: ['github', 'twitter', 'trello', 'email', 'blog'],

})(PersonForm));


PersonForm.propTypes = {
  savedInLocalStorage: PropTypes.bool,
  team: PropTypes.bool,
  core: PropTypes.bool,
  closeForm: PropTypes.func.isRequired,
  id: PropTypes.string,
  change: PropTypes.func.isRequired,
  form: PropTypes.string.isRequired,
  valid: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  formInputValues: PropTypes.shape({
    name: PropTypes.string,
    avatar: PropTypes.string,
    twitter: PropTypes.string,
    github: PropTypes.string,
    blog: PropTypes.string,
    email: PropTypes.string,
    trello: PropTypes.string,
    team: PropTypes.bool,
    core: PropTypes.bool,
    translator: PropTypes.bool,
    developer: PropTypes.bool,
    editor: PropTypes.bool,
    author: PropTypes.bool,
    salary: PropTypes.number,
  }),
  avatar: PropTypes.string,
  errorState: PropTypes.shape({
    name: PropTypes.string,
    statusCode: PropTypes.number,
    statusText: PropTypes.string,
  }),
};


PersonForm.defaultProps = {
  savedInLocalStorage: false,
  formInputValues: {
    avatar: null,
    twitter: null,
    github: null,
    blog: null,
    email: null,
    trello: null,
    team: false,
    core: false,
    translator: false,
    developer: false,
    editor: false,
    author: false,
    salary: 0,
  },
  team: false,
  core: false,
  id: null,
  avatar: null,
  errorState: null,
};

