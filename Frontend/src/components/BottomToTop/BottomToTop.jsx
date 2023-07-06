import React, { useEffect, useState } from "react";

const BottomToTop = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleButtonClick = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="go-top-btn">
        <button
          id="go-top-btn"
          className={showButton ? "show" : ""}
          onClick={handleButtonClick}
        >
          <img src="https://png.pngtree.com/png-vector/20190419/ourmid/pngtree-vector-up-arrow-icon-png-image_956434.jpg" className="h-10" alt="" />
        </button>
      </div>
    </>
  );
};

export default BottomToTop;
