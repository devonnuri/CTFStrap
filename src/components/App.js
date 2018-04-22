import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './Home';
import Challenge from './Challenge';
import Rank from './Rank';

import '../style/index.scss';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/challenge' component={Challenge} />
        <Route path='/rank' component={Rank} />
      </Switch>
    )
  }
}

export default App
