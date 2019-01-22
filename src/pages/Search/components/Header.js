import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import * as routes from 'constants/routes';

const Header = ({ isLoading }) => {
  const linkClass = classNames({
    search__link: true,
    disabled: isLoading,
  });

  return (
    <Fragment>
      <Link to={routes.HOME} className={linkClass}>
        Back to Collection
      </Link>
      <h1 className="search__title">Search from Nasa</h1>
    </Fragment>
  );
};

export default Header;
