import React from 'react';
import PropTypes from 'prop-types';
import PersonForm from './PersonForm';

import '../styles/Person.css';

function Person() {
  return (
    <article className="person" >
      <PersonForm />
    </article>
  );
}

Person.contextTypes = {
  store: PropTypes.object,
};

export default Person;
