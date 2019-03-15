import React, { memo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Main from 'components/Main';

const Loading = memo(({ isSearching }) => {
  const loadingClass = classNames({
    loading: true,
    'loading--search': isSearching,
  });

  return (
    <Main page={loadingClass}>
      <div className="loading__dot-floating" />
    </Main>
  );
});

Loading.propTypes = {
  isSearching: PropTypes.bool,
};

Loading.defaultProps = {
  isSearching: false,
};

export default Loading;
