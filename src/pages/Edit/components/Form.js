import React, { memo } from 'react';

import Input from 'components/Shared/Input';
import Button from 'components/Shared/Button';

const Form = memo(props => {
  const isInvalid = props.title === '' || props.description === '';

  return (
    <form onSubmit={props.onSubmit}>
      <div className="nasa-edit__form-item">
        <p className="nasa-edit__form-title">Title</p>
        <Input
          name="title"
          value={props.title}
          onChange={props.onChange}
          placeholder={props.title}
          inputRef={props.inputRef}
        />
      </div>
      <div className="nasa-edit__form-item">
        <p className="nasa-edit__form-title">Description</p>
        <Input
          name="description"
          value={props.description}
          onChange={props.onChange}
          placeholder={props.description}
        />
      </div>
      <Button type="submit" disabled={isInvalid}>
        Save
      </Button>
    </form>
  );
});

export default Form;
