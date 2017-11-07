import React from 'react';
import PersonForm from './PersonForm';
import PersonSearchForm from './PersonSearchForm';
import '../styles/index.css';

export default class PersonCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state =
    {
      personForm: false,
      response: {},
    };
  }

  componentWillMount() {
    if ((localStorage.getItem('empty') !== null)) {
      this.setState({ personForm: true });
    }
  }

  setFields=(response) => {
    this.setState({ response });
  }

  handleSearchFormChange=() => {
    this.setState({ personForm: true });
  }

  handlePersonFormChange=() => {
    this.setState({ personForm: false });
  }


  render() {
    let personForm = (<PersonSearchForm
      form="personSearch"
      key="personSearch"
      openForm={this.handleSearchFormChange}
      setFields={this.setFields}

    />);
    if (this.state.personForm) {
      personForm = (<PersonForm
        closeForm={this.handlePersonFormChange}
        form="empty"
        key="empty"
        github={this.state.response.github}
        twitter={this.state.response.twitter}
        trello={this.state.response.trello}

      />);
    }
    return (
      personForm
    );
  }
}
