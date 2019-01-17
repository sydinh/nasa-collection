import React, { Children } from 'react';
import PropTypes from 'prop-types';

const Main = ({ page, children }) => (
  <main className={`main ${page}`} role="main">
    {Children.toArray(children)}
  </main>
);

Main.propTypes = {
  page: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Main;
