import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../../icon/javascript/icon';

const renderField = ({
  icon,
  placeholder,
  type,
  meta,
  input,
}) => {
  const { asyncValidating, valid, invalid, pristine, active } = meta;
  return (
    <label className="person__label">
      <input
        {...input}
        data-invalid={invalid}
        className={`
          person__input
          ${pristine ? ' person__input--clean' : ''}
          ${asyncValidating ? ' person__input--validating' : ''}
          ${(!active) && valid ? ' person__input--valid' : ''}
          ${(!active) && invalid ? ' person__input--invalid' : ''}
        `}
        type={type}
        placeholder={placeholder}
      />
      {icon && <Icon icon={icon} className="icon--person" />}
    </label>
  );
};

renderField.propTypes = {
  icon: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  input: PropTypes.shape().isRequired,
  meta: PropTypes.shape({
    asyncValidating: PropTypes.bool,
    valid: PropTypes.bool,
    pristine: PropTypes.bool,
  }).isRequired,
};

renderField.defaultProps = {
  icon: null,
  placeholder: false,
  type: 'text',
};

export default renderField;
