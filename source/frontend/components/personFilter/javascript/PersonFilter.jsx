import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import renderField from '../../person/javascript/PersonField';
import renderCheckboxField from '../../person/javascript/PersonCheckboxField';
import '../../person/styles/index.css';
import store from '../../../stores/store';
import * as actions from '../actions';

class PersonFilter extends React.Component {

  filterByName = (event) => {
    const name = event.currentTarget.value;
    store.dispatch(actions.filterByName(name));
  };

  debounceFilterByName=(func, event, ms) => {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      func(event);
    }, ms);
  }

  filterTeam = (event) => {
    const status = event.currentTarget.checked;
    store.dispatch(actions.filterTeam(status));
  };

  filterNoTeam = (event) => {
    const status = event.currentTarget.checked;
    store.dispatch(actions.filterNoTeam(status));
  };


  showList = (name) => {
    const regex = new RegExp(`(^|[\\s]+)${name}`, 'ig');
    return this.props.persons
      .filter(element => (regex.test(element.name)))
      .filter(element =>
        ((element.team && this.props.filterTeam) || (!element.team && this.props.filterNoTeam)))
      .map(element => (<option key={element._id} value={element.name} />)).splice(0, 10);
  };


  render() {
    return (
      <form
        className="person person--filter"
        onSubmit={(event) => {
          event.preventDefault();
          this.filterByName(event);
        }}
      >
        <Field
          onChange={
            event => this.debounceFilterByName(this.filterByName, event, 300)
          }
          className="person__input"
          list="searchName"
          autoComplete="off"
          icon="search"
          name="searchName"
          component={renderField}
          type="search"
          placeholder="Поиск по имени"
        />
        <datalist id="searchName">
          {this.showList(this.props.searchName)}
        </datalist>

        <section className="person-form__fieldset person__fieldset--main">
          <Field
            name="filterTeam"
            id="filterTeam"
            component={renderCheckboxField}
            type="checkbox"
            label="В команде"
            onChange={this.filterTeam}
          />
          <Field
            name="filterNoTeam"
            id="filterNoTeam"
            component={renderCheckboxField}
            type="checkbox"
            label="Не в команде"
            onChange={this.filterNoTeam}
          />
        </section>
      </form>
    );
  }
}


function mapStateToProps(state) {
  const filterReducer = state.personsFilterReducer;
  const persons = state.personsReducer.persons;
  const options = {
    searchName: filterReducer.filterByName,
    filterTeam: filterReducer.team,
    filterNoTeam: filterReducer.noTeam,
  };
  return {
    initialValues: options,
    ...options,
    persons,
  };
}

export default connect(mapStateToProps)(reduxForm({
  form: 'filter',
})(PersonFilter));

PersonFilter.propTypes = {
  persons: PropTypes.arrayOf(PropTypes.object).isRequired,
  searchName: PropTypes.string,
  filterTeam: PropTypes.bool,
  filterNoTeam: PropTypes.bool,
};

PersonFilter.defaultProps = {
  searchName: '',
  filterTeam: true,
  filterNoTeam: true,
};
