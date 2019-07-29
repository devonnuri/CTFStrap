import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import MainPage from './pages/MainPage';
import ChallListPage from './pages/ChallListPage';
import ScoreboardPage from './pages/ScoreboardPage';
import Header from './components/Header';

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact component={MainPage} />
        <Route path="/challenges" component={ChallListPage} />
        <Route path="/scoreboard" component={ScoreboardPage} />
      </Switch>
    </Router>
  );
};

export default App;
