import toast, { Toaster } from 'react-hot-toast';


export const base_Url = "http://localhost:5000/api/";

//Validate Email
export const validateEmail = (email) => {
  // Regular expression for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

//toasts
export const showSuccessMessage = (message) =>
toast.success(message);

export const showErrorMessage = (message) =>
toast.error(message);
