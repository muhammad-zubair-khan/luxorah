import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Input from "../../../components/Input";
import Btn from "../../../components/Btn";
import { showErrorMessage, showSuccessMessage } from "../../../functions";
import { addColor, resetState } from "../../../features/Color/ColorSlice";
const Color = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = React.useState("");
  const [titleError, setTitleError] = React.useState("");

  const color = useSelector((state) => state?.color?.createdColor?.newColor);
  console.log("New Color", color);
  // const {
  //   isSuccess,
  //   isError,
  //   isLoading,
  //   message,
  //   createdColor,
  //   colorName,
  //   updatedColor,
  // } = newColor;
  const handleTitleChange = (e) => {
    const value = e.target.value;
    const onlyTextAndNumbers = /^[a-zA-Z0-9\s]*[a-zA-Z0-9][a-zA-Z0-9\s]*$/;
    setTitle(value);
    if (!value) {
      setTitleError("Color Name is required!");
    } else if (!onlyTextAndNumbers.test(value)) {
      setTitleError("Only text and numbers are allowed!");
    } else {
      setTitleError("");
    }
  };
  const handleColor = () => {
    if (!title) {
      setTitleError("Color Name is required!");
    }

    if (title) {
      dispatch(addColor({ title }));
      setTitle("");
      setTitleError("");
    }
  };

  // React.useEffect(() => {
  //   if (isSuccess && createdColor) {
  //     showSuccessMessage(createdColor.message);
  //   }
  //   if (isSuccess && updatedColor) {
  //     showSuccessMessage("Color Updated Successfullly!");
  //     navigate("/color-list");
  //   }
  //   if (isError) {
  //     showErrorMessage("Something Went Wrong!");
  //   }
  // }, [isSuccess, isError, isLoading]);

  // Reset the state when component unmounts or navigates away
  React.useEffect(() => {
    return () => {
      dispatch(resetState());
    };
  }, []);
  return (
    <>
      <div className="container mx-auto">
        <div className="border border-solid p-6 max-w-xl mx-auto">
          <h2 className="text-xl font-bold text-gray-600">Add Colors</h2>
          <div className="my-4">
            <Input
              type="text"
              label="Color Name"
              id="standard-text-basic"
              variant="outlined"
              autoComplete="off"
              value={title}
              onChange={handleTitleChange}
              className="form-select py-3 mb-3 bg-white w-full border border-gray-300 p-3 rounded-md shadow-sm"
            />
            {titleError && (
              <div className="text-sm text-red-600 ml-2">{titleError}</div>
            )}
          </div>

          <Btn
            title="Add Color"
            variant="contained"
            type="submit"
            onClick={handleColor}
            className="mt-4 bg-blue-500 text-white rounded-md px-4 py-2"
          ></Btn>
        </div>

        <ToastContainer />
      </div>
    </>
  );
};

export default Color;
