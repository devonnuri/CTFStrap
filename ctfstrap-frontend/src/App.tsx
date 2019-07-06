import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import MainPage from './pages/MainPage';

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" component={MainPage}/>
      </Switch>
    </Router>
  );
}

export default App;
