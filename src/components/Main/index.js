import React, { Children } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Main = ({ page, children }) => {
  const mainClass = classNames({
    main: true,
    [page]: page,
  });

  return (
    <main className={mainClass} role="main">
      {Children.toArray(children)}
    </main>
  );
};

Main.propTypes = {
  page: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Main;
