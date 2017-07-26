import React from 'react';
import PropTypes from 'prop-types';
import '../styles/icon.css';

function Icon({ className, icon, viewBox, width, height }) {
  return (
    <svg
      viewBox={viewBox}
      className={`icon icon--${icon} ${className}`}
      width={width}
      height={height}
    >
      <use xlinkHref={`#${icon}`} />
    </svg>
  );
}


Icon.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string,
  viewBox: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};

Icon.defaultProps = {
  className: '',
  icon: null,
  viewBox: '0 0 24 24',
  width: 24,
  height: 24,
};

export default Icon;
