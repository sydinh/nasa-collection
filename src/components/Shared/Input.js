import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Input extends Component {
  render() {
    return (
      <input
        type={this.props.type}
        name={this.props.name}
        value={this.props.value}
        onChange={this.props.onChange}
        placeholder={this.props.placeholder}
        className={`form-control ${this.props.className}`}
        ref={this.props.inputRef}
      />
    );
  }
}

Input.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  inputRef: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.string]),
};

Input.defaultProps = {
  type: 'text',
  name: '',
  value: '',
  placeholder: 'placeholder',
  className: '',
  inputRef: '',
};

export default Input;
