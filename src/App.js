import React, { Component, Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';

import Home from 'pages/Home';
import Search from 'pages/Search';
import NotFound from 'pages/NotFound';

import * as routes from 'constants/routes';

class App extends Component {
  render() {
    return (
      <Fragment>
        <Switch>
          <Route exact path={routes.NASA_COLLECTION} component={Home} />
          <Route path={routes.NASA_SEARCH} component={Search} />
          <Route component={NotFound} />
        </Switch>
      </Fragment>
    );
  }
}

export default hot(App);
