import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Input from "../../../components/Input";
import Btn from "../../../components/Btn";
import { addBrands, resetState } from "../../../features/Brand/BrandSlice";
import { showErrorMessage, showSuccessMessage } from "../../../functions";
const Brand = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = React.useState("");
  const [titleError, setTitleError] = React.useState("");

  const brand = useSelector((state) => state?.brand?.createdBrand?.newBrand);
  console.log("NEW BRand", brand);

  const handleTitleChange = (e) => {
    const value = e.target.value;
    const onlyTextAndNumbers = /^[a-zA-Z0-9\s]*[a-zA-Z0-9][a-zA-Z0-9\s]*$/;
    setTitle(value);
    if (!value) {
      setTitleError("Title is required!");
    } else if (!onlyTextAndNumbers.test(value)) {
      setTitleError("Only text and numbers are allowed!");
    } else {
      setTitleError("");
    }
  };
  const handleBrand = () => {
    if (!title) {
      setTitleError("Title is required!");
    }

    if (title) {
      dispatch(addBrands({ title }));
      setTitle("");
      setTitleError("");
    }
  };

  // React.useEffect(() => {
  //   if (isSuccess && updatedBrand) {
  //     showSuccessMessage("Brand Updated Successfullly!");
  //     navigate("/brand-list");
  //   }
  //   if (isError) {
  //     showErrorMessage("Something Went Wrong!");
  //   }
  // }, [isSuccess, isError]);

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
          <h2 className="text-xl font-bold text-gray-600">Add Brands</h2>
          <div className="my-4">
            <Input
              type="text"
              label="Brand Name"
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
            title="Add Brand"
            variant="contained"
            type="submit"
            onClick={handleBrand}
            className="mt-4 bg-blue-500 text-white rounded-md px-4 py-2"
          ></Btn>
        </div>

        <ToastContainer />
      </div>
    </>
  );
};

export default Brand;
