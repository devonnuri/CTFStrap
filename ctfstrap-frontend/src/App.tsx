import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import MainPage from './pages/MainPage';
import ChallListPage from './pages/ChallListPage';

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={MainPage}/>
        <Route path="/chall" component={ChallListPage}/>
      </Switch>
    </Router>
  );
}

export default App;
