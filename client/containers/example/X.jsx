import React from 'react'
import Radium from 'radium'

@Radium
export default class ExampleSimple extends React.Component {
  render() {
    return (
      <div style={styles.root}></div>
    )
  }
}

const styles = {
  root: {
    background: 'black',
    border: 'solid 1px white',
    float: 'left',
    height: 100,
    width: 100,
    ':hover': {
      background: 'blue'
    },
    '@media (min-width: 992px)': {
      height: 200
    }
  }
}

