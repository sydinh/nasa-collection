import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';

import Home from 'pages/Home';
import Search from 'pages/Search';
import NotFound from 'pages/NotFound';

import Footer from 'components/Footer';

import * as routes from 'constants/routes';

const App = () => (
  <Fragment>
    <Switch>
      <Route exact path={routes.HOME} component={Home} />
      <Route path={routes.SEARCH} component={Search} />
      <Route component={NotFound} />
    </Switch>
    <Footer />
  </Fragment>
);

export default hot(App);
