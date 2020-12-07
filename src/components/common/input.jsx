import React from "react";

const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        {...rest}
        name={name}
        id={name}
        className="form-control"
        aria-describedby="emailHelp"
      />
      {error && <div className="alert alert-danger w-100">{error}</div>}
    </div>
  );
};

export default Input;
