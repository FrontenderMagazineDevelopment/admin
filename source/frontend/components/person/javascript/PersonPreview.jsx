import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../../icon/javascript/icon';

export default function PersonPreview() {
  let name = 'Антон Немцев';
  name = name.replace(/([^\s]{,3})([\s])/, '$1&nbsp;');
  name = name.replace(/([^\s]{3,})([\s])/, '$1<br/>');

  return (
    <article className="person person--preview">
      <picture className="person__avatar">
        <source
          media="(-o-max-device-pixel-ratio: 5/4), (-webkit-max-device-pixel-ratio: 1.25), (max--moz-device-pixel-ratio: 1.25), (max-device-pixel-ratio: 1.25), (max-resolution: 1.25dppx)"
          srcSet="http://secure.gravatar.com/avatar/42d28bf1279809d7bcfcae925a2b50c1?s=80"
        />
        <source
          media="(-o-min-device-pixel-ratio: 5/4), (-webkit-min-device-pixel-ratio: 1.25), (min--moz-device-pixel-ratio: 1.25), (min-device-pixel-ratio: 1.25), (min-resolution: 1.25dppx)"
          srcSet="http://secure.gravatar.com/avatar/42d28bf1279809d7bcfcae925a2b50c1?s=160"
        />
        <img alt="avatar" src="http://secure.gravatar.com/avatar/42d28bf1279809d7bcfcae925a2b50c1?s=80" />
      </picture>
      <section className="person__details">
        <p className="person__name" dangerouslySetInnerHTML={{ __html: name }} />
        <ul className="person__roles">
          <li className="person__role person__role--developer" title="Разработчик">
            <Icon icon="developer" />
          </li>
          <li className="person__role person__role--team" title="В основной команде">
            <Icon icon="team" />
          </li>
          <li className="person__role person__role--editor" title="Редактор">
            <Icon icon="editor" />
          </li>
          <li className="person__role person__role--translator" title="Переводчик">
            <Icon icon="translator" />
          </li>
          <li className="person__role person__role--author" title="Автор">
            <Icon icon="author" />
          </li>
        </ul>
      </section>
    </article>);
}

PersonPreview.contextTypes = {
  store: PropTypes.object,
};
