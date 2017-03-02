import React from 'react'
import {render} from 'react-dom'

import { Provider } from 'react-redux';

import store from './configureStore';
import User from './User';
import { getUserByName } from './reducer';

const App = () => 
  <div>
    <User id={1} />
    <User withSelector={getUserByName} name={"Dan"} />
    <User
      disconnect
      addLike={() => console.log("add like!")}
      name={"Test"}
      likes={10} />
  </div>

const Main = () =>
  <Provider store={store}>
    <App />
  </Provider>

render(<Main />, document.querySelector('#demo'))
