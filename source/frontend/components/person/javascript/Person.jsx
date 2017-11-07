import React from 'react';
import PropTypes from 'prop-types';
import PersonForm from './PersonForm';
import PersonPreview from './PersonPreview';
import '../styles/index.css';


class Person extends React.Component {
  constructor(props) {
    super(props);
    this.state = { personEditCard: false };
  }

  componentWillMount() {
    if ((localStorage.getItem(this.props.id) !== null)) {
      this.setState({ personEditCard: true });
    }
  }

  handlePersonPreviewChange = () => {
    this.setState({ personEditCard: true });
  }

  handlePersonFormChange = () => {
    this.setState({ personEditCard: false });
  }


  render() {
    let personCard =
      (<PersonPreview
        openForm={this.handlePersonPreviewChange}
        id={this.props.id}
        key={this.props.id}
        name={this.props.name}
        avatar={this.props.avatar}
        team={this.props.team}
        core={this.props.core}
        translator={this.props.translator}
        developer={this.props.developer}
        editor={this.props.editor}
        author={this.props.author}
      />);
    if (this.state.personEditCard) {
      personCard =
        (<PersonForm
          closeForm={this.handlePersonFormChange}
          id={this.props.id}
          v={this.props.v}
          key={this.props.id}
          form={this.props.id}
          name={this.props.name}
          avatar={this.props.avatar}
          twitter={this.props.twitter}
          github={this.props.github}
          blog={this.props.blog}
          email={this.props.email}
          trello={this.props.trello}
          team={this.props.team}
          core={this.props.core}
          translator={this.props.translator}
          developer={this.props.developer}
          editor={this.props.editor}
          author={this.props.author}
          salary={this.props.salary}
        />);
    }
    return (
      personCard
    );
  }
}


Person.propTypes = {
  id: PropTypes.string.isRequired,
  v: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
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
};

Person.defaultProps = {
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
};

export default Person;
