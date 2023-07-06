import { useState } from "react";
import BeatLoader from "react-spinners/BeatLoader";

const Loader = (props) => {
  const { loading } = props;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: loading ? "#ffffff" : "transparent",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <BeatLoader
        color={`black`}
        loading={loading}
        size={20}
        style={{
          borderRadius: "100%",
          animation:
            "0.75s linear 0s infinite normal both running react-spinners-ClipLoader-clip",
        }}
      />
    </div>
  );
};

export default Loader;
