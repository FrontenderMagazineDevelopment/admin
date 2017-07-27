import React from 'react';
import PropTypes from 'prop-types';

const renderSalaryField = ({
  className,
  id,
  disabled,
  placeholder,
  type,
  meta,
  input,
}) => {
  const { asyncValidating, valid, invalid, pristine, active } = meta;
  return (
  <label className="person__label" htmlFor={id}>
    <input
      {...input}
      id={id}
      type="text"
      disabled={disabled}
      className={`
        person__input
        person__input--salary
        ${pristine ? ' person__input--clean' : ''}
        ${asyncValidating ? ' person__input--validating' : ''}
        ${(!active) && valid ? ' person__input--valid' : ''}
        ${(!active) && invalid ? ' person__input--invalid' : ''}
      `}
    />
    $/1K знаков.
  </label>
)};

renderSalaryField.propTypes = {
  className: PropTypes.string,
  type: PropTypes.oneOf(['text']),
  id: PropTypes.string.isRequired,
  input: PropTypes.shape().isRequired,
};

renderSalaryField.defaultProps = {
  className: '',
  icon: null,
  type: 'text',
};

export default renderSalaryField;
