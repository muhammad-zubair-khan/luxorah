import React from "react";
import { deleteSize, getSizes } from "../../../features/Size/SizeSlice";
import { showSuccessMessage } from "../../../functions";
import { AiFillDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "antd";
import MyModal from "../../../components/MyModal";

const SizeList = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [sizeId, setSizeId] = React.useState("");
  const showModal = (e) => {
    setOpen(true);
    setSizeId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };
  const sizeState = useSelector((state) => state?.size?.sizes);
  const newSize = useSelector((state) => state?.size);
  const { isSuccess, deletedSize } = newSize;
  const [columns, setColumns] = React.useState([]);

  React.useEffect(() => {
    dispatch(getSizes());
  }, [dispatch]);

  React.useEffect(() => {
    if (sizeState && sizeState.length > 0) {
      const firstSize = sizeState[0];
      const columnKeys = Object.keys(firstSize).filter(
        (key) => key !== "__v" && key !== "updatedAt"
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
        if (key === "createdAt") {
          return {
            title: "Created At",
            dataIndex: key,
            key,
            render: (text) =>
              new Date(text).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              }) +
              " " +
              new Date(text).toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "numeric",
              }),
            sorter: (a, b) => new Date(a[key]) - new Date(b[key]),
          };
        }
        return {
          title: key.toUpperCase(),
          dataIndex: key,
          key,
          sorter: (a, b) => a[key]?.localeCompare(b[key]),
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
  }, [sizeState]);

  const data = sizeState?.map((size, index) => ({
    ...size,
    sno: index + 1,
    key: index + 1,
    action: (
      <>
        <Link
          to={`/size/edit/${sizeState[index]._id}`}
          className="text-danger text-lg md:text-xl"
        >
          <BiEdit className="inline-block align-middle" />
        </Link>
        <button
          className="ml-3 text-danger text-lg md:text-xl bg-transparent border-0"
          onClick={() => showModal(sizeState[index]._id)}
        >
          <AiFillDelete className="inline-block align-middle" />
        </button>
      </>
    ),
  }));

  //Delete Size API
  const HandleDeleteSize = (e) => {
    dispatch(deleteSize(e)).then(() => {
      dispatch(getSizes());
    });
    setOpen(false);
  };

  // React.useEffect(() => {
  //   if (isSuccess && deletedCategory) {
  //     showSuccessMessage("deleted Successfully");
  //   }
  //   // if (isSuccess && updatedCategory) {
  //   //   showSuccessMessage("Category Updated Successfullly!");
  //   //   navigate("/category-list");
  //   // }
  //   // if (isError) {
  //   //   showErrorMessage("Something Went Wrong!");
  //   // }
  // }, [isSuccess]);

  const handleRowClick = (record) => {
    console.log("Clicked Row:", record);
    // Perform actions with the clicked record
  };
  return (
    <>
      <h6>Size-List</h6>
      <Table
        columns={columns}
        dataSource={data}
        onRow={(record) => ({ onClick: () => handleRowClick(record) })}
      />
      <MyModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          HandleDeleteSize(sizeId);
        }}
        title="Are you sure you want to delete this Size?"
      />
    </>
  );
};

export default SizeList;
