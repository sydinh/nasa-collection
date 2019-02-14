import React from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from 'constants/routes';

const Header = () => (
  <header role="banner" className="home__header">
    <h1 className="home__title">
      <Link to={ROUTES.HOME} className="home__title-inner">
        NASA Collection
      </Link>
    </h1>
    <Link to={ROUTES.NASA_SEARCH} className="home__button button">
      Add new item
    </Link>
  </header>
);

export default Header;
