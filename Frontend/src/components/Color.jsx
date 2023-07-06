import React, { useState } from "react";
import { CheckCircleOutlined } from "@ant-design/icons";

const Color = (props) => {
  const { colorData, setColor } = props;
  const [selectedColor, setSelectedColor] = useState(null);

  const handleColorClick = (item) => {
    if (selectedColor === item.title) {
      setSelectedColor(null);
      setColor(null);
    } else {
      setSelectedColor(item.title);
      setColor(item.title);
    }
  };

  return (
    <>
      <ul className="colors" >
        {colorData &&
          colorData?.map((item, index) => (
            <>
              <li
                key={index}
                // onClick={() => setColor(item?.title)}
                onClick={() => handleColorClick(item)}
                style={{ cursor: "pointer", fontWeight: selectedColor === item.title ? "bold" : "normal",}}
              >
                {selectedColor === item?.title && <CheckCircleOutlined/>} {item?.title}
              </li>
            </>
          ))}
      </ul>
    </>
  );
};

export default Color;
