import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const Input = (props) => {
  const { label, autoComplete, type, variant, id, value, onChange,className } = props;
  return (
    <>
      {/* <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "35ch" },
        }}
        // noValidate
        autoComplete="off"
      >
        <TextField
           id={id}
        type={type}
        label={label}
        variant={variant}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
        className={`w-full ${className}`}
      </Box> */}
      {/* <div className="flex flex-col gap-4 m-2"> */}
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
    {/* </div> */}
    </>
  );
};

export default Input;
