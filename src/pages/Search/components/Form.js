import React, { memo } from 'react';

import Input from 'components/Shared/Input';

const Form = memo(props => (
  <form onSubmit={props.handleSubmit}>
    <Input
      type="search"
      name="searchTerm"
      value={props.searchTerm}
      onChange={props.handleChange}
      placeholder="Type something to search..."
      className="search__form-control"
      inputRef={props.inputRef}
    />
  </form>
));

export default Form;
