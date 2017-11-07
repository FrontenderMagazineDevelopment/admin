import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Person from '../../person/javascript/Person';
import PersonCreate from '../../person/javascript/PersonCreate';
import PersonFilter from '../../personFilter/javascript/PersonFilter';
import '../styles/index.css';


class Persons extends React.Component {
  constructor() {
    super();
    this.getPersons = this.getPersons.bind(this);
  }


  getPersons() {
    return this.props.personsReducer.persons.map(person => (<Person
      id={person._id}
      key={person._id}
      v={person.__v}
      name={person.name}
      avatar={person.avatar}
      twitter={person.twitter}
      github={person.github}
      blog={person.blog}
      email={person.email}
      trello={person.trello}
      team={person.team}
      core={person.core}
      translator={person.translator}
      developer={person.developer}
      editor={person.editor}
      author={person.author}
      salary={person.salary}
    />));
  }

  render() {
    const filterName = this.props.personsFilterReducer.filterByName;
    const filterTeam = this.props.personsFilterReducer.team;
    const filterNoTeam = this.props.personsFilterReducer.noTeam;
    return (
      <div>
        <PersonFilter />
        <article className="persons">
          <PersonCreate />
          {this.getPersons()
            .filter(person => (filterName === undefined
            ) || (new RegExp(`(^|[\\s]+)${filterName}`, 'ig').test(person.props.name)))
            .filter(person =>
              ((person.props.team && filterTeam) || (!person.props.team && filterNoTeam)))
          }
        </article>
      </div>);
  }
}


function mapStateToProps(state) {
  return {
    personsReducer: state.personsReducer,
    personsFilterReducer: state.personsFilterReducer,
  };
}

export default connect(mapStateToProps)(Persons);


Persons.propTypes = {
  personsReducer: PropTypes.shape({
    persons: PropTypes.arrayOf(PropTypes.object),
    isError: PropTypes.bool,
    error: PropTypes.object,
  }).isRequired,
  personsFilterReducer: PropTypes.shape({
    filterByName: PropTypes.string,
    team: PropTypes.bool,
    noTeam: PropTypes.bool,
  }).isRequired,
};


Persons.defaultProps = {
  personsFilterReducer: PropTypes.shape({
    filterByName: '',
    team: true,
    noTeam: true,
  }),
};
