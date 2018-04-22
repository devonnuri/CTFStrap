import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './components/Header';
import Home from './routes/Home';
import Challenge from './routes/Challenge';

import config from './ctfstrap.config';

import 'bootstrap/dist/css/bootstrap.min.css';

document.title = config.title;

render(
  <BrowserRouter>
    <div>
      <Header/>
      <Route exact path='/' component={Home} />
      <Route path='/challenge' component={Challenge} />
    </div>
  </BrowserRouter>, document.getElementById('root'));
