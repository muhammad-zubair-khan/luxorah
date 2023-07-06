import React, { useEffect, useState } from "react";
import EmptyState from "../../components/EmptyState";
import { Link, useParams } from "react-router-dom";
import { Button, Typography, Image } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
const { Title } = Typography;
import ReactStars from "react-rating-stars-component";
import { FaWhatsapp } from "react-icons/fa";
import { Modal, Input } from "antd";
import "react-medium-image-zoom/dist/styles.css";
import {
  addRating,
  getProductById,
} from "../../features/Cataglog/Product/ProductSlice";
import { useDispatch, useSelector } from "react-redux";
import Color from "../../components/Color";
import { showErrorMessage } from "../../functions";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Meta from "../../components/Meta/Meta";
import Loader from "../../components/Loader/Loader";
import { createAOrder } from "../../features/User/UserSlice";

const ProductDetail = () => {
  const { id, region } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state?.product?.productById);
  const { isLoading } = useSelector((state) => state?.product);
  const auth = useSelector((state) => state?.auth?.user?.user);
  const [quantity, setQuantity] = useState(1);
  const [quantityError, setQuantityError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [star, setStar] = useState(null);
  const [starError, setStarError] = useState("");
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState("");
  const [alreadyAdded, setAlreadyAdded] = React.useState(false);
  const [color, setColor] = React.useState(null);
  const [showOptions, setShowOptions] = useState(false); // State to control visibility of options
  const [regions, setRegions] = useState(region || "aed");
  // Default selected region
  const handleRegionSelect = (regions) => {
    setRegions(regions);
    setShowOptions(false); // Hide the options after selection
  };


  useEffect(() => {
    dispatch(getProductById({ id: id, region: regions }));
  }, [id, regions]);

  const handleIncrease = () => {
    if (quantity < product.quantity) {
      setQuantity(quantity + 1);
    } else {
      setQuantityError("Out of Stock!");
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      setQuantityError("");
    }
  };
  const [reference, setReference] = useState("");
  const [referenceError, setReferenceError] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleModalToggle = () => {
    if (color == null) {
      showErrorMessage("please choose color");
      return false;
    } else {
      setShowModal(!showModal);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    const onlyText = /^[a-zA-Z\s]*[a-zA-Z][a-zA-Z\s]*$/;
    setReference(value);
    if (!value) {
      setReferenceError("This Field is Required!");
    } else if (!onlyText.test(value)) {
      setReferenceError("Only text is allowed!");
    } else {
      setReferenceError("");
    }
  };

  const message =
    `I want to buy this product:\n\n` +
    `Product Name: ${product?.title}\n` +
    `Price: ${product?.price}\n` +
    `Product ID: ${product?._id}\n` +
    `Color: ${color !== null ? color : "N/A"}\n` +
    `\n` +
    `Shared by:\n` +
    `Name: ${auth?.name}\n` +
    `Email: ${auth?.email}\n` +
    `\n` +
    `Product Link: ${window.location.href}\n` +
    `This order is for: ${reference}`;
  const handleSendWhatsappMessage = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://api.whatsapp.com/send?text=${encodedMessage}`;
    if (!reference || reference.trim() === "") {
      setReferenceError("This field is Required");
    } else {
      dispatch(
        createAOrder({
          orderBy: {
            name: auth?.name,
            email: auth?.email,
          },
          sharedProduct: {
            productId: product?._id,
            productName: product?.title,
            productPrice: product?.price,
            totalPrice: `${currencySymbol} ${
              priceWithoutSymbol * quantity + parseFloat(dividedPrice)
            }`,
            quantity: quantity,
            color: color !== null ? color : "N/A",
            productLink: window.location.href,
          },
          orderFor: { name: reference },
        })
      );
      window.open(whatsappURL, "_blank");
      setReferenceError("");
      setShowModal(false);
      setReference("");
    }
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    const noDoubleSpaces = /^(?!.* {2})[\s\S]+$/;
    setFirstName(value);
    if (!value) {
      setFirstNameError("Name is required!");
    } else if (!noDoubleSpaces.test(value)) {
      setFirstNameError("no double spaces are allowed!");
    } else {
      setFirstNameError("");
    }
  };

  const handleCommentChange = (e) => {
    const value = e.target.value;
    const abusiveWords = [
      "motherfucker",
      "gandu",
      "bc",
      "mc",
      "mf",
      "ass",
      "dick head",
      "bastard",
      "bitch",
      "son of a bitch",
      "shit",
      "piss off",
      "asshole",
      "gando",
      "bsdk",
      "fuck",
    ];

    setComment(value);

    const containsAbusiveWord = abusiveWords.some((word) => {
      const lowercaseWord = word.toLowerCase();
      return value.toLowerCase().includes(lowercaseWord);
    });

    if (!value) {
      setCommentError("Message is required!");
    } else if (containsAbusiveWord) {
      setCommentError("Abusive language is not allowed!");
    } else {
      setCommentError("");
    }
  };

  const handleRating = async (e) => {
    e.preventDefault();

    if (star === null) {
      showErrorMessage("Please Select Rating!");
    }
    if (!firstName || firstName.trim === "") {
      setFirstNameError("Name is required!");
    }
    if (!comment || comment.trim === "") {
      setCommentError("Message is required!");
    }

    if (star && firstName && comment) {
      await dispatch(
        addRating({
          star: star,
          firstName: firstName,
          comment: comment,
          productId: id,
        })
      );
      await dispatch(getProductById({ id: id, region: regions }));
      setFirstName("");
      setStar("");
      setComment("");
    }
  };
  const symbol = product?.price?.match(/[^\d.,\s]+/)?.[0];
  const symbolRegExp = new RegExp(
    symbol?.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
    "g"
  );
  const currencyMap = {
    $: "USD",
    "£": "GBP",
    "₹": "INR",
    "€": "EUR",
    AED: "AED",
    PKR: "PKR",
    OMR: "OMR",
  };
  // Remove the currency symbol from the price
  const priceWithoutSymbol = product?.price?.replace(symbolRegExp, "");
  const dividedPrice = (parseFloat(priceWithoutSymbol) / 2).toFixed(2); // Divide the price by 2 and format it with two decimal places
  const currencySymbol = product?.price.match(/^[^\d]+/)?.[0];
  const currencyCodeShip = currencyMap[currencySymbol];

  const formattedShippingPrice = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: currencyCodeShip,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(dividedPrice);

  const price = product?.price;
  const numericPart = price?.replace(/[^\d.]/g, "");

  const currencyPart = price?.match(/^\D+/)[0].trim();
  const currencyCode = currencyMap[currencyPart];

  const formattedPrice = isNaN(numericPart)
    ? "Invalid Price"
    : new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: currencyCode,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(numericPart);

  // const totalPrice = parseFloat(formattedPrice.replace(/[^\d.-]/g, '')) + parseFloat(formattedShippingPrice.replace(/[^\d.-]/g, ''));
  const totalPrice =
    parseFloat(formattedPrice.replace(/[^\d.-]/g, "")) * quantity +
    parseFloat(formattedShippingPrice.replace(/[^\d.-]/g, ""));

  const formattedTotalPrice = totalPrice?.toLocaleString("en-US", {
    style: "currency",
    currency: currencyCode,
  });

  return (
    <>
      <Meta title={`${product?.title} | Luxora`} />
      {isLoading ? (
        <>
          <Loader loading={isLoading} />
        </>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-12 m-3 mt-10">
            <div className="md:col-span-4 md:grid-cols-12 m-3">
              <Carousel>
                {product?.images?.map((item, index) => (
                  <div key={index}>
                    <img
                      src={item?.url}
                      alt=""
                      className={`cursor-pointer object-contain rounded `}
                      style={{ height: "inherit" }}
                    />
                  </div>
                ))}
              </Carousel>
            </div>

            <div className="md:col-span-5 w-full">
              <div className="p-title my-2 mr-2">
                <Title level={2}>{product?.title}</Title>
              </div>
              <hr />
              <div className="p-price my-2 flex items-baseline">
                {formattedPrice}
                <span className="sub-title mx-2">Change Currency: </span>
                <div className="relative">
                  <button
                    type="button"
                    className="block ml-4  border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    onClick={() => setShowOptions(!showOptions)} // Toggle showOptions state on button click
                  >
                    {regions.toUpperCase()}
                  </button>
                  {showOptions && (
                    <div  className="absolute z-10 w-max p-3 mt-1 bg-white border rounded-md shadow-lg">
                      <ul className="py-1 space-y-2">
                        <li
                          className="cursor-pointer hover:bg-blue-500 hover:text-white px-2 py-1 rounded-md"
                          onClick={() => handleRegionSelect("pound")}
                        >
                          POUND
                        </li>
                        <li
                          className="cursor-pointer hover:bg-blue-500 hover:text-white px-2 py-1 rounded-md"
                          onClick={() => handleRegionSelect("usd")}
                        >
                          USD
                        </li>
                        <li
                          className="cursor-pointer hover:bg-blue-500 hover:text-white px-2 py-1 rounded-md"
                          onClick={() => handleRegionSelect("euro")}
                        >
                          EUR
                        </li>
                        <li
                          className="cursor-pointer hover:bg-blue-500 hover:text-white px-2 py-1 rounded-md"
                          onClick={() => handleRegionSelect("aed")}
                        >
                          AED
                        </li>
                        <li
                          className="cursor-pointer hover:bg-blue-500 hover:text-white px-2 py-1 rounded-md"
                          onClick={() => handleRegionSelect("pkr")}
                        >
                          PKR
                        </li>
                        <li
                          className="cursor-pointer hover:bg-blue-500 hover:text-white px-2 py-1 rounded-md"
                          onClick={() => handleRegionSelect("omr")}
                        >
                          OMR
                        </li>
                        <li
                          className="cursor-pointer hover:bg-blue-500 hover:text-white px-2 py-1 rounded-md"
                          onClick={() => handleRegionSelect("inr")}
                        >
                          INR
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-price my-2 text-red-600">
                {/* {product?.price} - Shipping Fees */}
                {`${formattedShippingPrice} - Shipping Fees`}
              </div>
              <div className="p-price my-2">
                <Link
                  onClick={handleModalToggle}
                  className="flex items-center text-blue-500"
                >
                  <FaWhatsapp className="mr-2" />
                  Share on WhatsApp
                </Link>

                <Modal
                  visible={showModal}
                  onCancel={handleModalToggle}
                  footer={null}
                  centered
                  destroyOnClose
                >
                  <div className="mb-4">
                    <Input
                      value={reference}
                      onChange={handleInputChange}
                      placeholder="Reference *"
                      style={{ marginBottom: 0, marginTop: 20 }}
                    />
                    {referenceError && (
                      <p className="text-red-500 text-sm mb-2">
                        {referenceError}
                      </p>
                    )}
                  </div>
                  <Button onClick={handleSendWhatsappMessage}>
                    Save and Share
                  </Button>
                </Modal>
              </div>
              <div className="p-color flex flex-col">
                {alreadyAdded === false && (
                  <>
                    <h3>Select Color:</h3>
                    <Color setColor={setColor} colorData={product?.color} />
                  </>
                )}
              </div>

              <div className="p-description my-2">
                <h6>About this item</h6>
                <div>
                  <div
                    className="custom-width"
                    dangerouslySetInnerHTML={{
                      __html: product?.description || "",
                    }}
                  />
                </div>
              </div>
            </div>

            <div
              className="md:col-span-3 w-full"
              //   style={{ border: "1px solid red" }}
            >
              <div className="buy-now">
                <Title level={3}>Order Now:</Title>
              </div>
              <div className="p-price my-2">Delivery June 13 - 26</div>
              <div className="p-location my-2">Deliver to location</div>
              <div className="p-price my-2 ">{formattedPrice}</div>
              <div className="p-price my-2 text-red-600">
                {`${formattedShippingPrice} - Shipping Fees`}
              </div>
              <div className="p-stock mb-2">
                {alreadyAdded === false && (
                  <>
                    <span>
                      {product?.quantity <= 20
                        ? `Only ${product?.quantity} left in stock - order soon.`
                        : "In Stock"}
                    </span>
                  </>
                )}
              </div>
              <div className="p-quantity mb-2 flex items-center">
                {alreadyAdded === false && (
                  <>
                    <p className="mr-2">Qty</p>
                    <Button
                      icon={<PlusOutlined />}
                      onClick={handleIncrease}
                      className="rounded-l"
                    />
                    <span className="px-4">{quantity}</span>
                    <Button
                      icon={<MinusOutlined />}
                      onClick={handleDecrease}
                      className="rounded-r"
                    />
                  </>
                )}
              </div>
              {quantityError && (
                <div className="text-red-500 mb-2">{quantityError}</div>
              )}
              <div>
                <div className="p-btn mb-2 flex flex-col">
                  <div className="p-price my-2 font-bold">
                    {/* Total = {currencySymbol}
                    {priceWithoutSymbol * quantity + parseFloat(dividedPrice)} */}
                    Total = {formattedTotalPrice}
                  </div>
                  <Button className="mb-2">
                    <Link
                      onClick={handleModalToggle}
                      className="flex items-center text-blue-500"
                    >
                      <FaWhatsapp className="mr-2" />
                      Share Now
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 my-20">
            <div className="col-span-6 mx-auto container">
              <h1 className="font-bold text-xl text-center">Image Gallery</h1>
              <div className="image-gallery-container">
                <Image.PreviewGroup
                  rootClassName="my-preview-group"
                  preview={{
                    onChange: (current, prev) =>
                      console.log(
                        `current index: ${current}, prev index: ${prev}`
                      ),
                  }}
                >
                  {product?.images?.map((item) => (
                    <Image
                      width={200}
                      height={200}
                      src={`${item.url}?w=164&h=164&fit=crop&auto=format`}
                      style={{ padding: "10px" }}
                    />
                  ))}
                </Image.PreviewGroup>
              </div>
            </div>
            <div className="col-span-6 md:col-span-6 ml-9">
              <h3 id="review" className="font-bold text-2xl text-center">
                Give your Feedback
              </h3>
              <div className="review-inner-wrapper ">
                <div className="review-form py-4 ">
                  <form
                    onSubmit={(e) => handleRating(e)}
                    className="flex flex-col gap-15"
                  >
                    <ReactStars
                      count={5}
                      size={44}
                      value={3}
                      edit={true}
                      activeColor="#ffd700"
                      onChange={(e) => setStar(e)}
                    />
                    {starError && (
                      <div className="text-sm text-red-600">{starError}</div>
                    )}
                    <div className="mb-2">
                      <Input
                        className="w-100 form-control"
                        placeholder="Name"
                        value={firstName}
                        onChange={handleNameChange}
                        style={{
                          width: "70%",
                          border: "1px solid #dddddd",
                          outline: "none",
                          padding: "10px",
                        }}
                      ></Input>
                      {firstNameError && (
                        <div className="text-sm text-red-600">
                          {firstNameError}
                        </div>
                      )}
                    </div>
                    <div>
                      <textarea
                        name=""
                        id=""
                        className="w-100 form-control"
                        cols="30"
                        rows="4"
                        placeholder="Comments"
                        value={comment}
                        onChange={handleCommentChange}
                        style={{
                          width: "70%",
                          border: "1px solid #dddddd",
                          outline: "none",
                        }}
                      ></textarea>
                      {commentError && (
                        <div className="text-sm text-red-600">
                          {commentError}
                        </div>
                      )}
                    </div>
                    <div className="d-flex justify-content-end">
                      <button
                        style={{
                          background: "#f28123",
                          color: "white",
                          marginTop: "11px",
                          padding: "7px",
                          borderRadius: "6px",
                        }}
                        type="submit"
                      >
                        Submit Review
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 my-20 container mx-auto">
            <div className="col-span-12 md:col-span-6 md:ml-9 mt-4 md:mt-0">
              <div className="reviews mt-4">
                <h3 className="font-bold text-3xl">Customer Reviews</h3>
                {product && product?.ratings?.length > 0 ? (
                  product?.ratings?.map((item, index) => (
                    <div className="review">
                      <div className="d-flex gap-10 align-items-center">
                        <h6 className="font-bold ml-2">
                          {(item?.firstName).toUpperCase()}
                        </h6>
                        <ReactStars
                          count={5}
                          size={33}
                          value={item?.star}
                          edit={false}
                          activeColor="#ffd700"
                        />
                      </div>
                      <p className="font-semibold ml-2">{item?.comment}</p>
                    </div>
                  ))
                ) : (
                  <>
                    <div>No Reviews</div>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductDetail;
