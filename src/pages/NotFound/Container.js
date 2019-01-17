import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

import withScrollToTopOnMount from 'utils/withScrollToTopOnMount';
import Main from 'components/Main';

const NotFoundContainer = ({ history }) => {
  return (
    <Fragment>
      <Helmet>
        <title>Not Found</title>
      </Helmet>
      <Main page="not-found">
        <h1 className="not-found__title">404</h1>
        <h4 className="not-found__subtitle">Sorry, page not found!</h4>
        <p className="not-found__desc">It seems like you are heading in the wrong direction</p>
        <h6 onClick={() => history.goBack()} className="not-found__link">
          Go back
        </h6>
      </Main>
    </Fragment>
  );
};

export default compose(
  withRouter,
  withScrollToTopOnMount,
)(NotFoundContainer);
