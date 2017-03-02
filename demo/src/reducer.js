import { LIKE } from './actions';
import { find } from 'lodash';

const initialState = {
  1: {
    id: 1,
    name: "Simon",
    likes: 2
  },
  2: {
    id: 2,
    name: "Philip",
    likes: 3
  },
  3: {
    id: 3,
    name: "Dan",
    likes: 4
  }
};

const addLike = (state, { id }) => {
  const user = state[id];
  return {
    ...state,
    [id]: {
      ...user,
      likes: user.likes + 1
    }
  }
}

const userReducer = (state=initialState, action) => {
  switch (action.type) {
    case LIKE:
      return addLike(state, action)
    default:
      return state;
  }
}

export const getUserById = (state, { id }) => state[id];

export const getUserByName = (state, { name }) => find(state, u => u.name === name);

export default userReducer;