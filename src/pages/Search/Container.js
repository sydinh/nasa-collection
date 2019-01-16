import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';

import withScrollToTopOnMount from 'utils/withScrollToTopOnMount';

const SearchContainer = () => (
  <Fragment>
    <Helmet>
      <title>NASA Search</title>
    </Helmet>
    <h1>Search Container</h1>
  </Fragment>
);

export default withScrollToTopOnMount(SearchContainer);
