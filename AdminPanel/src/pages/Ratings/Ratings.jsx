import React from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MyModal from "../../components/MyModal";
import { showSuccessMessage } from "../../functions";
import { deleteRating, getRatings } from "../../features/Rating/RatingSlice";

const Ratings = () => {
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const [ratId, setRatId] = React.useState("");
    const showModal = (e) => {
      setOpen(true);
      setRatId(e);
    };
  
    const hideModal = () => {
      setOpen(false);
    };
    const rating = useSelector((state) => state?.ratings?.ratings);
    const newRating = useSelector((state) => state?.ratings);
    const { isSuccess, deletedRating } = newRating;
    const [columns, setColumns] = React.useState([]);
  
    React.useEffect(() => {
      dispatch(getRatings());
    }, [dispatch]);
  
    React.useEffect(() => {
      if (rating && rating.length > 0) {
        const firstRating = rating[0];
        const columnKeys = Object.keys(firstRating).filter(
          (key) => key !== "__v" 
        );
        const columnsData = columnKeys.map((key, index) => {
          if (key === "_id") {
            return {
              title: "SNo",
              dataIndex: "sno",
              key: "sno",
              sorter: (a, b) => a.key.length - b.key.length,
              render: (text, record, rowIndex) => rowIndex + 1,
            };
          }
          if (key === "action") {
            return {
              title: "ACTION",
              dataIndex: "action",
              key: "action",
            };
          }
          return {
            title: key.toUpperCase(),
            dataIndex: key,
            key,
          };
        });
        // Add the action field to the columnsData
        columnsData.push({
          title: "ACTION",
          dataIndex: "action",
          key: "action",
        });
  
        setColumns(columnsData);
      }
    }, [rating]);
  
    const data = rating?.map((rat, index) => ({
      ...rat,
      sno: index + 1,
      key: index + 1,
      action: (
        <>
          
          <button
            className="ml-3 text-danger text-lg md:text-xl bg-transparent border-0"
            onClick={() => showModal(rating[index]?._id)}
          >
            <AiFillDelete className="inline-block align-middle" />
          </button>
        </>
      ),
    }));
  
    //Delete Rating API
    const HandleDeleteRating = (e) => {
      dispatch(deleteRating(e)).then(() => {
        dispatch(getRatings());
      });
      setOpen(false);
    };
  
    const handleRowClick = (record) => {
      console.log("Clicked Row:", record);
    };
  return (
    <>
    <Table
        columns={columns}
        dataSource={data}
        onRow={(record) => ({ onClick: () => handleRowClick(record) })}
      />
      <MyModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
            HandleDeleteRating(ratId);
        }}
        title="Are you sure you want to delete this Review?"
      />
    </>
  )
}

export default Ratings