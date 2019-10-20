import React from 'react';
import styled from 'styled-components';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Header from './components/base/Header';
import Core from './components/base/Core';
import MainPage from './pages/MainPage';
import ChallListPage from './pages/ChallListPage';
import ScoreboardPage from './pages/ScoreboardPage';
import LoginPage from './pages/LoginPage';
import LogoutPage from './pages/LogoutPage';
import RegisterPage from './pages/RegisterPage';
import Footer from './components/base/Footer';
import AdminMainPage from './pages/admin/AdminMainPage';
import AdminChallPage from './pages/admin/AdminChallPage';
import AdminChallCreatePage from './pages/admin/AdminChallCreatePage';
import AdminUserPage from './pages/admin/AdminUserPage';

const Content = styled.div`
  flex: 1;
`;

const App: React.FC<{}> = () => (
  <Router>
    <Header />
    <Content>
      <Switch>
        <Route path="/" exact component={MainPage} />
        <Route path="/challenges" component={ChallListPage} />
        <Route path="/scoreboard" component={ScoreboardPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/logout" component={LogoutPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/admin" exact component={AdminMainPage} />
        <Route path="/admin/chall" exact component={AdminChallPage} />
        <Route
          path="/admin/chall/create"
          exact
          component={AdminChallCreatePage}
        />
        <Route path="/admin/user" component={AdminUserPage} />
      </Switch>
    </Content>
    <Footer />
    <Core />
  </Router>
);

export default App;
