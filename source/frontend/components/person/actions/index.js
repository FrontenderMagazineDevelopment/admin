import * as person from '../types';

/*
 * action creators
 */

export function create() {
  console.log('create: ', arguments);
  return {
    type: 'bobo',
    payload: 'lalka',
  }
};

export function read() {};

export function update() {};

export function remove() {};
