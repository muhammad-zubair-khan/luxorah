import { Button } from "@mui/material";
import React from "react";

const Btn = (props) => {
  const { variant, onClick, title, type,width,className,color  } = props;
  const buttonStyle = {
    width: width || "auto",
  };

  return (
    <>
     <div className="flex justify-center">
      <Button
      color={color}
        type={type}
        variant={variant}
        onClick={onClick}
        className={`px-4 py-2 text-sm rounded ${className}`}
        style={buttonStyle}
      >
        {title}
      </Button>
    </div>
    </>
  );
};

export default Btn;
