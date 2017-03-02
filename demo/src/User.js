import React from 'react';

import connected from '../../src'

import { getUserById } from './reducer';
import { addLike } from './actions';

const preventDefault = (f) => (e) => {
  e.preventDefault();
  f();
}


const User = connected(({ name, likes, addLike, id }) =>
  <div>
    <p>name: {name}</p>
    <p>likes: {likes}</p>
    <a href="#" onClick={preventDefault(() => addLike(id))}>
      Add like
    </a>
  </div>
)

User.defaultProps = {
  withSelector: getUserById,
  withActions: { addLike }
}

export default User;