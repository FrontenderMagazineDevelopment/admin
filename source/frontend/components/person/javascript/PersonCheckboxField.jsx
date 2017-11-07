import React from 'react';
import PropTypes from 'prop-types';

const renderCheckboxField = ({
                               className,
                               type,
                               id,
                               input,
                               label,
                               disabled,
                             }) => (
                               <div className={`person__input-container ${className}`}>
                                 <input
                                   {...input}
                                   disabled={disabled}
                                   id={id}
                                   type={type}
                                   className={'person__checkbox'}
                                 />
                                 <label className="person__label" htmlFor={id}>{label}</label>
                               </div>
  );

renderCheckboxField.propTypes = {
  className: PropTypes.string,
  type: PropTypes.oneOf(['checkbox', 'radio']),
  id: PropTypes.string.isRequired,
  input: PropTypes.shape().isRequired,
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

renderCheckboxField.defaultProps = {
  className: '',
  icon: null,
  type: 'text',
  disabled: false,
};

export default renderCheckboxField;
