import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../../icon/javascript/icon';

export default class PersonPreview extends React.Component {


  getPersonRoles=(roles) => {
    const keys = Object.keys(roles);
    const personRoles = [];
    keys.forEach((role) => {
      if (this.props[role]) {
        personRoles.push(roles[role]);
      }
    });
    return personRoles;
  }

  showPersonForm=() => {
    this.props.openForm();
  }


  render() {
    let
      name = this.props.name;
    name = name.replace(/([^\s]{,3})([\s])/, '$1&nbsp;');
    name = name.replace(/([^\s]{3,})([\s])/, '$1<br/>');

    const roles = {
      developer: (<li key="developer" className="person__role person__role--developer" title="Разработчик">
        <Icon icon="developer" />
      </li>),
      editor: <li key="editor" className="person__role person__role--editor" title="Редактор">
        <Icon icon="editor" />
      </li>,
      translator: <li key="translator" className="person__role person__role--translator" title="Переводчик">
        <Icon icon="translator" />
      </li>,
      author: <li key="author" className="person__role person__role--author" title="Автор">
        <Icon icon="author" />
      </li>,
      core: <li key="core" className="person__role person__role--core" title="За деньги">
        <Icon icon="team" />
      </li>,
    };


    let rolesList;
    if (this.props.team === true) {
      rolesList = (<ul className="person__roles">
        {this.getPersonRoles(roles)}
      </ul>);
    }

    return (
      <article className="person person--preview">
        <picture className="person__avatar">
          <Icon icon="empty" className="icon person__empty" width={57} height={80} viewBox="0 0 58 80" />
          <img className="person__image" alt="avatar" src={this.props.avatar} />
        </picture>
        <section className="person__details">
          <p className="person__name" dangerouslySetInnerHTML={{ __html: name }} />
          {rolesList}
          <button className="person__button person__button--edit" type="button" onClick={this.showPersonForm}>
            <Icon icon="edit" width={40} height={40} />
          </button>
        </section>
      </article>
    );
  }
}

PersonPreview.propTypes = {
  openForm: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string,
  team: PropTypes.bool.isRequired,
};

PersonPreview.defaultProps = {
  avatar: null,
};
