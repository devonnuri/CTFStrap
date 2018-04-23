import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './components/Header';
import Home from './routes/Home';
import Challenge from './routes/Challenge';
import Rank from './routes/Rank';
import Login from './routes/Login';

import config from './ctfstrap.config';

import 'bootstrap/dist/css/bootstrap.min.css';
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
    </div>
  </BrowserRouter>,
  document.getElementById('root')
);
