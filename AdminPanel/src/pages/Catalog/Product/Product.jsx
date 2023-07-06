import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactQuill from "react-quill";
import { Select } from "antd";
import Dropzone from "react-dropzone";
import "react-quill/dist/quill.snow.css";
import Input from "../../../components/Input";
import Btn from "../../../components/Btn";
import { showErrorMessage, showSuccessMessage } from "../../../functions";
import { getBrands } from "../../../features/Brand/BrandSlice";
import { getCategories } from "../../../features/Cataglog/Category/CategorySlice";
import { getColors } from "../../../features/Color/ColorSlice";
import {
  delImg,
  resetImageState,
  uploadImg,
} from "../../../features/images/ImagesSlice";
import {
  addProduct,
  resetState,
} from "../../../features/Cataglog/Product/ProductSlice";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";
const Product = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [quantity, setQuantity] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [titleError, setTitleError] = React.useState("");
  const [priceError, setPriceError] = React.useState("");
  const [categoryError, setCategoryError] = React.useState("");
  const [quantityError, setQuantityError] = React.useState("");
  const [imagesError, setImagesError] = React.useState("");
  const [descriptionError, setDescriptionError] = React.useState("");
  const [brandError, setBrandError] = React.useState("");
  const [colorError, setColorError] = React.useState("");
  const [tagsError, setTagsError] = React.useState("");

  const [category, setCategory] = React.useState([]);
  const [brand, setBrand] = React.useState([]);
  const [color, setColor] = React.useState([]);
  const [tags, setTags] = React.useState([]);
  React.useEffect(() => {
    dispatch(getBrands());
    dispatch(getCategories());
    dispatch(getColors());
  }, []);

  const brandState = useSelector((state) => state?.brand?.brands);
  const catState = useSelector((state) => state?.category?.categories);
  const colorState = useSelector((state) => state?.color?.colors);
  const imgState = useSelector((state) => state?.upload?.images?.images);
  const { isLoading } = useSelector((state) => state?.upload);
  const newProduct = useSelector((state) => state?.product);
  const { isSuccess, isError, createdProduct } = newProduct;
  // React.useEffect(() => {
  //   if (isSuccess && createdProduct) {
  //     showSuccessMessage("Product Added Successfullly!");
  //   }
  //   if (isError) {
  //     showErrorMessage("Something Went Wrong!");
  //   }
  // }, [isSuccess, isError]);
  const coloropt = [];
  colorState?.forEach((i) => {
    coloropt?.push({
      label: i.title,
      value: i._id,
    });
  });
  const img = [];
  imgState?.forEach((i) => {
    img?.push({
      public_id: i.public_id,
      url: i.url,
    });
  });

  const handleTitleChange = (e) => {
    const value = e.target.value;
    // const onlyTextAndNumbers = /^[a-zA-Z0-9\s]*[a-zA-Z0-9][a-zA-Z0-9\s]*$/;
    const noDoubleSpaces = /^(?!.* {2})[\s\S]+$/;
    setTitle(value);
    if (!value) {
      setTitleError("Title is required!");
    } else if (!noDoubleSpaces.test(value)) {
      setTitleError("no double spaces are allowed!");
    } else {
      setTitleError("");
    }
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    const onlyNumbers = /^[0-9]*$/;
    setPrice(value);
    if (!value) {
      setPrice("Price is required!");
    } else if (!onlyNumbers.test(value)) {
      setPriceError("Only Numbers are allowed!");
    } else {
      setPriceError("");
    }
  };

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    const onlyNumbers = /^[0-9]*$/;
    setQuantity(value);
    if (!value) {
      setQuantity("Quantity is required!");
    } else if (!onlyNumbers.test(value)) {
      setQuantityError("Only Numbers are allowed!");
    } else {
      setQuantityError("");
    }
  };
  const handleColorChange = (e) => {
    setColor(e);
    console.log(color);
  };

  const handleDescriptionChange = (value) => {
    setDescription(value);
    if (!value) {
      setDescription("Description is required!");
    } else {
      setDescriptionError("");
    }
  };

  const handleBrandChange = (e) => {
    const value = e.target.value;
    setBrand(value);
    if (!value) {
      setBrand("Brand is required!");
    } else {
      setBrandError("");
    }
  };

  const handleCategoryChange = (value) => {
    setCategory(value);
    if (!value) {
      setCategory("Category is required!");
    } else {
      setCategoryError("");
    }
  };
  const handleCategoryBlur = () => {
    if (!category) {
      setCategoryError("Category is required!");
    }
  };

  const handleTagsChange = (e) => {
    const value = e.target.value;
    setTags(value);
    if (!value) {
      setTags("Tag is required!");
    } else {
      setTagsError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) {
      setTitleError("Title is required!");
    }
    if (!price) {
      setPriceError("Price is required!");
    }
    if (!quantity) {
      setQuantityError("Quantity is required!");
    }
    if (category.length === 0) {
      setCategoryError("Please select at least one category!");
    }
    if (brand.length === 0) {
      setBrandError("Please select at least one brand!");
    }
    if (color.length === 0) {
      setColorError("Please select at least one color!");
    }
    if (tags.length === 0) {
      setTagsError("Please enter at least one tag!");
    }
    if (!description) {
      setDescriptionError("Description is required!");
    }
    if (img.length === 0) {
      setImagesError("Please upload at least one image!");
    }
    const imageObjects = imgState?.map((img) => ({
      public_id: img?.public_id,
      url: img?.url,
    }));
    if (
      title &&
      price &&
      quantity &&
      category.length > 0 &&
      brand.length > 0 &&
      color.length > 0 &&
      tags.length > 0 &&
      description &&
      img.length > 0
    ) {
      const data = {
        title,
        price,
        description,
        images: imageObjects,
        quantity,
        category,
        color,
        brand,
        tags,
      };
      if (data) {
        dispatch(addProduct(data))
          .then(() => {
            // Reset the uploadImages state
            dispatch(resetImageState());
          })
          .catch((error) => {
            console.log(error);
          });
        setTitle("");
        setPrice("");
        setDescription("");
        setQuantity("");
        setCategory("");
        setTitleError("");
        setPriceError("");
        setQuantityError("");
        setCategoryError("");
        setImagesError("");
        setDescriptionError("");
      }
    }
  };

  // Reset the state when component unmounts or navigates away
  React.useEffect(() => {
    return () => {
      dispatch(resetState());
    };
  }, []);
  return (
    <>
      <div className="container mx-auto">
        <div className="border border-solid p-6 max-w-2xl mx-auto">
          <h2 className="text-xl font-bold text-gray-600">Add New Product</h2>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="mt-4">
              <Input
                type="text"
                label="Product Title"
                id="standard-text-basic"
                variant="outlined"
                autoComplete="off"
                value={title}
                onChange={handleTitleChange}
                className="form-select py-3 mb-3 bg-white w-full border border-gray-300 p-3 rounded-md shadow-sm"
              />
              {titleError && (
                <div className="text-sm ml-3 text-red-600 mt-1">
                  {titleError}
                </div>
              )}
            </div>
            <div className="mt-4">
              <Input
                type="number"
                label="Product Price"
                id="standard-text-basic"
                variant="outlined"
                autoComplete="off"
                value={price}
                onChange={handlePriceChange}
                className="form-select py-3 mb-3 bg-white w-full border border-gray-300 p-3 rounded-md shadow-sm"
              />
              {priceError && (
                <div className="text-sm ml-3 text-red-600 mt-1">
                  {priceError}
                </div>
              )}
            </div>
            <div className="mt-4">
              <Input
                type="number"
                label="Product Quantity"
                id="standard-text-basic"
                variant="outlined"
                autoComplete="off"
                value={quantity}
                onChange={handleQuantityChange}
                className="form-select py-3 mb-3 bg-white w-full border border-gray-300 p-3 rounded-md shadow-sm"
              />
              {quantityError && (
                <div className="text-sm ml-3 text-red-600 mt-1">
                  {quantityError}
                </div>
              )}
            </div>
            <div className="mt-4">
              <select
                name="brand"
                onChange={handleBrandChange}
                value={brand}
                className="form-select cursor-pointer py-3 mb-3 bg-white w-full border border-gray-300 p-3 rounded-md shadow-sm"
              >
                <option value="">Select Brand</option>
                {brandState.map((i, j) => {
                  return (
                    <option key={j} value={i.title}>
                      {i.title}
                    </option>
                  );
                })}
              </select>
              {brandError && (
                <div className="text-sm ml-3 text-red-600 mt-1">
                  {brandError}
                </div>
              )}
            </div>

            <div className="mt-4">
              <select
                name="Category"
                onChange={(e) => handleCategoryChange(e.target.value)}
                onBlur={handleCategoryBlur}
                value={category}
                className="form-select cursor-pointer py-3 mb-3 w-full bg-white border border-gray-300 p-3 rounded-md shadow-sm"
              >
                <option value="">Select Category</option>
                {catState.map((i, j) => {
                  return (
                    <option key={j} value={i._id}>
                      {i.title}
                    </option>
                  );
                })}
              </select>
              {categoryError && (
                <div className="text-sm ml-3 text-red-600 mt-1">
                  {categoryError}
                </div>
              )}
            </div>
            <div className="mt-4">
              <select
                name="tags"
                onChange={handleTagsChange}
                value={tags}
                className="form-select cursor-pointer py-3 mb-3 w-full bg-white border border-gray-300 p-3 rounded-md shadow-sm"
              >
                <option value="" disabled>
                  Select Tag
                </option>
                <option value="featured">Featured</option>
                <option value="popular">Popular</option>
                <option value="special">Special</option>
              </select>
              {tagsError && (
                <div className="text-sm ml-3 text-red-600 mt-1">
                  {tagsError}
                </div>
              )}
            </div>
            <div className="mt-4">
              <Select
                mode="multiple"
                allowClear
                className="w-full bg-white border border-gray-300 p-3 rounded-md shadow-sm"
                placeholder="Select colors"
                defaultValue={color}
                onChange={(i) => handleColorChange(i)}
                options={coloropt}
              />
              {colorError && (
                <div className="text-sm ml-3 text-red-600 mt-1">
                  {colorError}
                </div>
              )}
            </div>
            <div className="mt-4">
              <ReactQuill
                theme="snow"
                placeholder="Write Description here ..."
                value={description}
                onChange={handleDescriptionChange}
                className="bg-white border border-gray-300 p-3 rounded-md shadow-sm"
              />
              {descriptionError && (
                <div className="text-sm ml-3 text-red-600 mt-1">
                  {descriptionError}
                </div>
              )}
            </div>
            <div className="mt-4 bg-white border border-gray-300 p-5 text-center cursor-pointer">
              <Dropzone
                onDrop={(acceptedFiles, rejectedFile) =>
                  dispatch(uploadImg(acceptedFiles))
                }
                // onDrop={handleDrop}
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
                      <img
                        src={i.url}
                        alt="img"
                        style={{
                          width: "100px",
                          objectFit: "contain",
                          height: "100px",
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            )}
            <Btn
              title="Add Product"
              variant="contained"
              type="submit"
              className="mt-4 bg-blue-500 text-white rounded-md px-4 py-2"
            ></Btn>
          </form>
        </div>
      </div>
    </>
  );
};

export default Product;
