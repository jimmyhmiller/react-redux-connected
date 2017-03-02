# React Redux Connected

[![npm package][npm-badge]][npm]

React Redux Connected is an opinionated layer on top of [react-redux](https://github.com/reactjs/react-redux) that provides a simple props driven way to connect components.

### Example

```javascript
import connected from 'react-redux-connected';
import { getUserById } from './selectors';
import { addLike } from './actions';

const User = connected(({ name, likes, addLike }) =>
    <div>
        <p>name: {name}</p>
        <p>likes: {likes}</p>
        <a href="#" onClick={addLike}>Add like</a>
    </div>
)

const Users = () =>
  <div>
    <User name="Steve" likes={1} addLike={alertLike} />
    <User withSelector={getUserById} id={1} withActions={{ addLike }} />
  </div>
 
```

## Why?

It isn't uncommon to have a component that you want to use sometimes with redux and sometimes without. The main way this is achieved is by the container/component pattern. `connect` from react-redux allows us to create these containers that hook up our components to redux. But when trying to use our components with and without redux, we run into an organization problem, how do we expose both? The two most common patterns for this are to co-locate connect or to seperate the definitions.

#### Colocated

```javascript
// components/User.js
import { connect } from 'react-redux';
import { getUserById } from './selectors';
import { likeAction } from './actions';

const User = ({ name, likes, addLike }) =>
    <div>
        <p>name: {name}</p>
        <p>likes: {likes}</p>
        <a href="#" onClick={addLike}>Add like</a>
    </div>

export default connect(getUserById, { likeAction })(User);
```

As this file exists now, we cannot use the unconnected `User` component. If we decide we want to, we will often do something like this:

```javascript
// components/User.js
import { connect } from 'react-redux';
import { getUserById } from './selectors';
import { likeAction } from './actions';

export const UnconnectedUser = ({ name, likes, addLike }) => 
    <div>
        <p>name: {name}</p>
        <p>likes: {likes}</p>
        <a href="#" onClick={addLike}>Add like</a>
    </div>

export default connect(getUserById, { likeAction })(UnconnectedUser);
```

Now that `UnconnectedUser` is exported we can import it or import the default. This is ugly.

#### Not Colocated

```javascript
// components/User.js
const User = connected(({ name, likes, addLike }) =>
    <div>
        <p>name: {name}</p>
        <p>likes: {likes}</p>
        <a href="#" onClick={addLike}>Add like</a>
    </div>
)
export default User;
```

```javascript
// containers/User.js
import { connect } from 'react-redux';
import { getUserById } from './selectors';
import { likeAction } from './actions';

import User from '../components/User';

export default connect(getUserById, { likeAction })(User);
```

Now we can use both the connected and unconnected versions, but it requires us to import from a different location and without a different name it would be unclear whether we are using the connected or unconnected version in a given context.

### Benefits

With `redux-connected` we don't have to worry about importing something differently in order to decide if it is connected or not. We are able to not only choose between connected and not connected, but also how we connect it. We can use the same component with different selectors just by passing the `withSelector` prop. We can do the same for actions using `withActions`. 

Because `redux-connected` works via props, we can take advantage of defaultProps to export components that by default are connected but can be overwritten.

```javascript
// components/User.js
import connected from 'react-redux-connected';
import { getUserById } from './selectors';
import { addLike } from './actions';

const User = connected(({ name, likes, addLike }) =>
    <div>
        <p>name: {name}</p>
        <p>likes: {likes}</p>
        <a href="#" onClick={addLike}>Add like</a>
    </div>
)                 

User.defaultProps = {
  withSelector: getUserById,
  withActions: { addLike }
}

export default User
```

Now if we import `User`, it will be auto connected, but we can change that.

```javascript
<User withSelector={getUserByName} name="jimmy" />
<User withActions={{ addLike: subtractLikes }} />
<User withSelector={getUserByName} name="jimmy" withActions={{ addLike: subtractLikes }} />
<User disconnect name="jimmy" likes={3} addLike={alertLike} />
```
Here you can see the flexibility of `redux-connected`. When handed a connected component, we can completely change its behavior at the call site instead of in the file. This allows our components to be much more flexible.

### TL;DR

`redux-connected` keeps the separation of container/component while allowing us to delay the decision of how something is connected. This flexibility allows us to have more flexible components that are more enjoyable to use.



## Api

```javascript
connected :: Comp({...props}) => Comp({withSelectors, withActions, disconnect, ...props})
```

`connected` is a higher order component that gives your component the power to be connected to redux. It has three props that is uses and then passes the rest of the props passed it to your app.

* withSelectors = mapStateToProps
* withActions = mapDispatchToProps
* disconnect = don't use withSelectors or withActions





[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/react-redux-connected
