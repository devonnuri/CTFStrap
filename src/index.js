import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './routes/Home';
import Challenge from './routes/Challenge';
import Rank from './routes/Rank';
import Login from './routes/Login';
import Signup from './routes/Signup';

import config from './ctfstrap.config';

import './style/index.scss';

document.title = config.title;

render(
  <BrowserRouter>
    <div>
      <Header />

      <Route exact path="/" component={Home} />
      <Route path="/challenge" component={Challenge} />
      <Route path="/rank" component={Rank} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />

      <Footer />
    </div>
  </BrowserRouter>,
  document.getElementById('root')
);
