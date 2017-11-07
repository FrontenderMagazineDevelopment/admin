import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './stores/store';
import Persons from './components/persons/javascript/Persons';
import './components/layout/styles/reset.css';
import './components/layout/styles/layout.css';

const root = document.getElementById('page');
if (root !== null) {
  render(<Provider store={store}><Persons /></Provider>, root);
}
