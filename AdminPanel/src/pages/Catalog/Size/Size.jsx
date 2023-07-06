import React from 'react'
import { addSize, resetState } from '../../../features/Size/SizeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { showErrorMessage, showSuccessMessage } from '../../../functions';
import Input from '../../../components/Input';
import Btn from '../../../components/Btn';

const Size = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = React.useState("");
  const [titleError, setTitleError] = React.useState("");

  const size = useSelector((state) => state?.size?.createdSize?.newSize);
  console.log("New Size", size);
  const handleTitleChange = (e) => {
    const value = e.target.value;
    const onlyTextAndNumbers = /^[a-zA-Z0-9\s]*[a-zA-Z0-9][a-zA-Z0-9\s]*$/;
    setTitle(value);
    if (!value) {
      setTitleError("Size is required!");
    } else if (!onlyTextAndNumbers.test(value)) {
      setTitleError("Only text and numbers are allowed!");
    } else {
      setTitleError("");
    }
  };
  const handleSize = () => {
    if (!title) {
      setTitleError("Size is required!");
    }

    if (title) {
      dispatch(addSize({ title }));
      setTitle("");
      setTitleError("");
    }
  };

  // React.useEffect(() => {
  //   // if (isSuccess && createdSize) {
  //   //   showSuccessMessage(createdSize.message);
  //   // }
  //   if (isSuccess && updatedSize) {
  //     showSuccessMessage("Size Updated Successfullly!");
  //     navigate("/size-list");
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
        <h2 className="text-xl font-bold text-gray-600">Add Sizes</h2>
        <div className="my-4">
          <Input
            type="text"
            label="Size"
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
          title="Add Size"
          variant="contained"
          type="submit"
          onClick={handleSize}
          className="mt-4 bg-blue-500 text-white rounded-md px-4 py-2"
        ></Btn>
      </div>
    </div>
  </>
  )
}

export default Size