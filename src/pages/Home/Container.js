import React, { Component, Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { Link } from 'react-router-dom';

import withScrollToTopOnMount from 'utils/withScrollToTopOnMount';
import Main from 'components/Main';
import * as routes from 'constants/routes';

class HomeContainer extends Component {
  render() {
    return (
      <Fragment>
        <Helmet>
          <title>NASA Collection</title>
        </Helmet>
        <Main page="home">
          <header role="banner" className="home__header">
            <h1 className="home__title">
              <Link to={routes.HOME} className="home__title-inner">
                NASA Collection
              </Link>
            </h1>
            <Link to={routes.SEARCH} className="home__button button">
              Add new item
            </Link>
          </header>
        </Main>
      </Fragment>
    );
  }
}

export default compose(withScrollToTopOnMount)(HomeContainer);
