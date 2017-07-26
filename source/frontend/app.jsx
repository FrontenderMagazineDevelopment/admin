import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './stores/store';
import Person from './components/person/javascript/Person';

import './components/layout/styles/reset.css';
import './components/layout/styles/layout.css';

console.log('env: ', process.env.NODE_ENV);

const root = document.getElementById('page');
if (root !== null) {
  render(<Provider store={store}><Person /></Provider>, root);
}
