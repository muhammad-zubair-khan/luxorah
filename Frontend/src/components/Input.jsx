import React from "react";
import TextField from "@mui/material/TextField";

const Input = (props) => {
  const { label, autoComplete, type, variant, id, value, onChange, className } =
    props;
  return (
    <>
      <TextField
        id={id}
        type={type}
        label={label}
        variant={variant}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
        className={`w-full  ${className}`}
      />
    </>
  );
};

export default Input;
