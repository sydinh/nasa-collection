import React, { Component, Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';

import Home from 'pages/Home';
import Search from 'pages/Search';
import Edit from 'pages/Edit';
import NotFound from 'pages/NotFound';
import Footer from 'components/Footer';
import * as ROUTES from 'constants/routes';

class App extends Component {
  componentDidMount() {
    document.body.classList.remove('search-active');
  }

  render() {
    return (
      <Fragment>
        <Switch>
          <Route exact path={ROUTES.HOME} component={Home} />
          <Route exact path={ROUTES.NASA_SEARCH} component={Search} />
          <Route exact path={`${ROUTES.NASA_EDIT}/:id`} component={Edit} />
          <Route component={NotFound} />
        </Switch>
        <Footer />
      </Fragment>
    );
  }
}

export default hot(App);
