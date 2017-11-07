import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../../icon/javascript/icon';


class renderField extends React.Component {

  render() {
    const { asyncValidating, valid, invalid, pristine, active, error, touched } = this.props.meta;

    return (
      <label className="person__label">
        <input
          {...this.props.input}
          data-invalid={invalid}
          className={`
          person__input
          ${pristine ? ' person__input--clean' : ''}
          ${asyncValidating ? ' person__input--validating' : ''}
          ${(!active) && valid ? ' person__input--valid' : ''}
          ${(!active) && invalid ? ' person__input--invalid' : ''}
        `}
          type={this.props.type}
          placeholder={this.props.placeholder}
          list={this.props.list}
          autoComplete={this.props.autoComplete === undefined ? 'on' : this.props.autoComplete}
        />
        {this.props.icon && <Icon icon={this.props.icon} className="icon--person" />}

        {(
          touched &&
          (error && (<div
            ref={(element) => {
              if ((element !== null) && (element.getBoundingClientRect().right >
                Math.max(document.documentElement.clientWidth, window.innerWidth || 0))) {
                element.classList.add('person__field-error--left');
              }
            }}
            className="person__field-error"
          >{error}</div>)))}
      </label>
    );
  }
}

renderField.propTypes = {
  icon: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  input: PropTypes.shape().isRequired,
  meta: PropTypes.shape({
    asyncValidating: PropTypes.bool,
    valid: PropTypes.bool,
    invalid: PropTypes.bool,
    pristine: PropTypes.bool,
    active: PropTypes.bool,
    error: PropTypes.string,
    touched: PropTypes.bool,
  }).isRequired,
  autoComplete: PropTypes.string,
  list: PropTypes.string,
};

renderField.defaultProps = {
  icon: null,
  placeholder: false,
  type: 'text',
  autoComplete: 'on',
  list: '',
};

export default renderField;
