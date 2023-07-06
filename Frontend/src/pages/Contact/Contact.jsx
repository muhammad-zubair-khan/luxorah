import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { resetState } from "../../features/User/UserSlice";
import { addEnquiry } from "../../features/Contact/ContactSlice";
import { validateEmail } from "../../functions";
import Meta from "../../components/Meta/Meta";
import Loader from "../../components/Loader/Loader";

const Contact = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [message, setMessage] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [messageError, setMessageError] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 400);
  }, []);

  const handleNameChange = (e) => {
    const value = e.target.value;
    const onlyText = /^[a-zA-Z\s]*[a-zA-Z][a-zA-Z\s]*$/;
    setName(value);
    if (!value) {
      setNameError("Name is required!");
    } else if (!onlyText.test(value)) {
      setNameError("Only text allowed!");
    } else {
      setNameError("");
    }
  };
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (!value || value.trim() === "") {
      setEmailError("Please enter your email");
    } else if (!validateEmail(value)) {
      setEmailError("Please enter a valid email");
    } else {
      setEmailError("");
    }
  };
  const handleMobileChange = (e) => {
    const value = e.target.value;
    // const onlyNumbers = /^[0-9\s]*[0-9][0-9\s]*$/;
    const onlyNumbers = /^\d{1,12}$/;
    setMobile(value);
    if (!value) {
      setMobileError("Phone no is required!");
    } else if (!onlyNumbers.test(value)) {
      setMobileError("Invalid Phone Number");
    } else {
      setMobileError("");
    }
  };
  const handleMessageChange = (e) => {
    const value = e.target.value;
    setMessage(value);
    if (!value) {
      setMessageError("");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      setNameError("Name is required!");
    }
    if (!email) {
      setEmailError("Email is required!");
    }
    if (!mobile) {
      setMobileError("Phone no is required!");
    }
    const data = {
      name: name,
      email: email,
      mobile: mobile,
      message: message,
    };
    if (name && email && mobile) {
      dispatch(addEnquiry(data));
      setTimeout(() => {
        setName("");
        setEmail("");
        setMobile("");
        setMessage("");
        dispatch(resetState());
      }, 200);
    }
  };
  return (
    <>
      <Meta title={"Contact | Luxorah"} />
      {loading ? (
        <>
          <Loader loading={loading} />
        </>
      ) : (
        <>
          <section className="contact_us my-10">
            <div className="container mx-auto">
              <div className="flex flex-wrap justify-center">
                <div className="w-full md:w-10/12 lg:w-8/12">
                  <div className="contact_inner p-6 bg-white shadow-lg rounded-lg">
                    <div className="text-center">
                      <h3 className="text-2xl font-semibold">Contact Us</h3>
                      <p className="mt-2 text-gray-600">
                        Feel free to contact us any time. We will get back to
                        you as soon as we can!
                      </p>
                    </div>
                    <div className="mt-6">
                      <form action="" onSubmit={(e) => handleSubmit(e)}>
                        <input
                          type="text"
                          className="w-full px-4 py-2 rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                          placeholder="Name"
                          value={name}
                          onChange={handleNameChange}
                        />
                        {nameError && (
                          <p className="text-red-500 text-sm ml-3">
                            {nameError}
                          </p>
                        )}

                        <input
                          type="text"
                          className="w-full mt-4 px-4 py-2 rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                          placeholder="Email"
                          value={email}
                          onChange={handleEmailChange}
                        />
                        {emailError && (
                          <p className="text-red-500 text-sm ml-3">
                            {emailError}
                          </p>
                        )}

                        <input
                          type="number"
                          className="w-full mt-4 px-4 py-2 rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                          placeholder="Phone"
                          value={mobile}
                          onChange={handleMobileChange}
                        />
                        {mobileError && (
                          <p className="text-red-500 text-sm ml-3">
                            {mobileError}
                          </p>
                        )}

                        <textarea
                          className="w-full mt-4 px-4 py-2 rounded-lg border-gray-300 focus:outline-none focus:border-indigo-500"
                          placeholder="Message"
                          value={message}
                          onChange={handleMessageChange}
                        ></textarea>
                        {messageError && (
                          <p className="text-red-500 text-sm ml-3">
                            {messageError}
                          </p>
                        )}

                        <button
                          className="mt-4 px-6 py-2 bg-indigo-500 text-white rounded-lg focus:outline-none hover:bg-indigo-600"
                          type="submit"
                        >
                          Send
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="contact_info_sec mt-6">
            <h4 className="text-xl font-semibold">Contact Info</h4>
            <div className="flex items-center mt-2">
              <i className="fas fa-headset mr-2"></i>
              <span>+92 3104581083</span>
            </div>
            <div className="flex items-center mt-2">
              <i className="fas fa-envelope-open-text mr-2"></i>
              <span>info@OneShop.com</span>
            </div>
            <div className="flex items-center mt-2">
              <i className="fas fa-map-marked-alt mr-2"></i>
              <span>
                1000+ Travel partners and 65+ Service city across India, USA,
                Canada & UAE
              </span>
            </div>
          </div> */}
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Contact;
