import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from 'constants/routes';

const Header = () => (
  <Fragment>
    <Link to={ROUTES.HOME} className="search__link">
      Back to Collection
    </Link>
    <h1 className="search__title">Search from Nasa</h1>
  </Fragment>
);

export default Header;
