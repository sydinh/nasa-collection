import React, { Fragment, memo } from 'react';
import { Helmet } from 'react-helmet';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

import withScroll from 'utils/withScroll';
import Main from 'components/Main';
import * as ROUTES from 'constants/routes';

const NotFoundContainer = memo(({ history }) => (
  <Fragment>
    <Helmet>
      <title>Not Found</title>
    </Helmet>
    <Main page="not-found">
      <h1 className="not-found__title">404</h1>
      <h4 className="not-found__subtitle">Sorry, page not found!</h4>
      <p className="not-found__desc">It seems like you are heading in the wrong direction</p>
      <h6 onClick={() => history.push(ROUTES.HOME)} className="not-found__link">
        Go to the homepage
      </h6>
    </Main>
  </Fragment>
));

export default compose(
  withRouter,
  withScroll,
)(NotFoundContainer);
