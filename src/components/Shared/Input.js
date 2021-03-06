import React, { memo } from 'react';
import PropTypes from 'prop-types';

const Input = memo(props => (
  <input
    type={props.type}
    name={props.name}
    value={props.value}
    onChange={props.onChange}
    placeholder={props.placeholder}
    className={`form-control ${props.className}`}
    ref={props.inputRef}
  />
));

Input.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  inputRef: PropTypes.object,
};

Input.defaultProps = {
  type: 'text',
  name: '',
  value: '',
  placeholder: 'placeholder',
  className: '',
  inputRef: null,
};

export default Input;
