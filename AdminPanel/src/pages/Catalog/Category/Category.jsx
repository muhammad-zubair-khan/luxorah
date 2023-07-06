import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Input from "../../../components/Input";
import Btn from "../../../components/Btn";
import {
  addCategory,
  resetState,
} from "../../../features/Cataglog/Category/CategorySlice";
import { showErrorMessage, showSuccessMessage } from "../../../functions";
import Dropzone from "react-dropzone";
import {
  resetImageState,
  uploadCategoryImg,
} from "../../../features/images/ImagesSlice";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";
const Category = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = React.useState("");
  const [type, setType] = React.useState("");
  const [titleError, setTitleError] = React.useState("");
  const [typeError, setTypeError] = React.useState("");
  const [imagesError, setImagesError] = React.useState("");

  // const {isSuccess,message} = useSelector((state)=> state.category)
  // const newCategory = useSelector((state)=> state.category)
  // console.log("NEW CATEG",newCategory)
  const imgState = useSelector(
    (state) => state?.upload?.categoryImages?.images
  );
  const { isLoading } = useSelector((state) => state?.upload);

  const newCategory = useSelector((state) => state?.category);
  const {
    isSuccess,
    isError,
    message,
    createdCategory,
    categoryName,
    updatedCategory,
  } = newCategory;

  const img = [];
  imgState?.forEach((i) => {
    img?.push({
      public_id: i.public_id,
      url: i.url,
    });
  });
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

  const handleTypeChange = (e) => {
    const value = e.target.value;
    const onlyTextAndNumbers = /^[a-zA-Z0-9\s]*[a-zA-Z0-9][a-zA-Z0-9\s]*$/;
    setType(value);
    if (!value) {
      setTypeError("Type is required!");
    } else if (!onlyTextAndNumbers.test(value)) {
      setTypeError("Only text and numbers are allowed!");
    } else {
      setTypeError("");
    }
  };
  const handleCategory = async () => {
    if (!title) {
      setTitleError("Title is required!");
    }
    if (!type) {
      setTypeError("Type is required!");
    }
    if (img.length === 0) {
      setImagesError("Please upload at least one image!");
    }
    const imageObjects = imgState.map((img) => ({
      public_id: img.public_id,
      url: img.url,
    }));

    if (title && type && img.length > 0) {
      dispatch(addCategory({ title, type, images: imageObjects })).then(() => {
        // Reset the uploadImages state
        dispatch(resetImageState());
      });
      setTitle("");
      setType("");
      setTitleError("");
      setTypeError("");
      setImagesError("");
    }
  };

  // React.useEffect(() => {
  //   if (isSuccess && createdCategory) {
  //     showSuccessMessage(createdCategory.message);
  //   }
  //   if (isSuccess && updatedCategory) {
  //     showSuccessMessage("Category Updated Successfullly!");
  //     navigate("/category-list");
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
          <h2 className="text-xl font-bold text-gray-600">Add New Category</h2>
          <div className="mt-4">
            <Input
              type="text"
              label="Category Title"
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
          <div className="my-4">
            <Input
              type="text"
              label="Category Type"
              id="standard-text-basic"
              variant="outlined"
              autoComplete="off"
              value={type}
              onChange={handleTypeChange}
              className="form-select py-3 mb-3 bg-white w-full border border-gray-300 p-3 rounded-md shadow-sm"
            />
            {typeError && (
              <div className="text-sm text-red-600 ml-2">{typeError}</div>
            )}
          </div>
          <div className="mt-4 bg-white border border-gray-300 p-5 text-center cursor-pointer">
            <Dropzone
              onDrop={(acceptedFiles) =>
                dispatch(uploadCategoryImg(acceptedFiles))
              }
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
            {imagesError && (
              <div className="text-sm ml-3 text-red-600 mt-1">
                {imagesError}
              </div>
            )}
          </div>
          {isLoading ? (
            <>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  my: 3,
                }}
              >
                <CircularProgress />
              </Box>
            </>
          ) : (
            <div className="mt-4 flex flex-wrap gap-3">
              {imgState?.map((i, j) => {
                return (
                  <div className="relative" key={j}>
                    <button
                      type="button"
                      onClick={() => dispatch(delImg(i.public_id))}
                      className="btn-close absolute top-2 right-2"
                    ></button>
                    <img src={i.url} alt="" width={200} height={200} />
                  </div>
                );
              })}
            </div>
          )}
          <Btn
            title="Add Category"
            variant="contained"
            type="submit"
            onClick={handleCategory}
            className="mt-4 bg-blue-500 text-white rounded-md px-4 py-2"
          ></Btn>
        </div>

        <ToastContainer />
      </div>
    </>
  );
};

export default Category;
