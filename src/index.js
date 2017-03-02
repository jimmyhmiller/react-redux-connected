import React from 'react'
import { connect } from 'react-redux';

const overrideMerge = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
})

const connected = Comp => ({ withSelector, withActions, disconnect, ...rest }) => {
  if ((withSelector || withActions) && !disconnect) {
    const NewComp = connect(withSelector, withActions, overrideMerge)(Comp)
    return <NewComp {...rest} />
  }
  return <Comp {...rest} />
}

export default connected;