import React, { PropTypes } from 'react';

const TextInput = (
  { type, name, label, onChange, icon, value,
    error, onBlur, clearError, placeholder }) => {
  let wrapperClass = 'input-field col s12';
  if (error && error.length > 0) {
    wrapperClass += ' red-text';
  }

  return (
    <div className={wrapperClass}>
      <i className="material-icons prefix">{icon}</i>
      <input
      type={type}
      name={name}
      className="validate"
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={clearError}
      />
      {error && <span className="red-text">
        <i className="material-icons">error_outline</i> {error}</span>}
      <label htmlFor={name} classnames="active">{label}</label>
    </div>
  );
};

TextInput.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
  value: PropTypes.string,
  error: PropTypes.string,
  onBlur: React.PropTypes.func,
  clearError: React.PropTypes.func,
  placeholder: PropTypes.string
};

export default TextInput;
