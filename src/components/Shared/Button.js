import React, { Children, memo } from 'react';
import PropTypes from 'prop-types';

const Button = memo(props => (
  <button
    type={props.type}
    onClick={props.onClick}
    disabled={props.disabled}
    className={`button ${props.className}`}
  >
    {Children.toArray(props.children)}
  </button>
));

Button.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
};

Button.defaultProps = {
  type: 'button',
  onClick: () => {},
  disabled: false,
  className: '',
  children: 'Default',
};

export default Button;
