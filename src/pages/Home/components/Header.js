import React from 'react';
import { Link } from 'react-router-dom';

import * as routes from 'constants/routes';

const Header = () => (
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
);

export default Header;
