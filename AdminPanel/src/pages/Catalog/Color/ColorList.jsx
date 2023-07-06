import React from "react";
import { getColors, deleteColor } from "../../../features/Color/ColorSlice";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MyModal from "../../../components/MyModal";
import { showSuccessMessage } from "../../../functions";

const ColorList = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [colorId, setColorId] = React.useState("");
  const showModal = (e) => {
    setOpen(true);
    setColorId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };
  const colorState = useSelector((state) => state.color.colors);
  console.log("colorState", colorState);
  const newColor = useSelector((state) => state.color);
  const { isSuccess, deletedColor } = newColor;
  const [columns, setColumns] = React.useState([]);

  React.useEffect(() => {
    dispatch(getColors());
  }, [dispatch]);

  React.useEffect(() => {
    if (colorState && colorState.length > 0) {
      const firstColor = colorState[0];
      const columnKeys = Object.keys(firstColor).filter(
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
  }, [colorState]);

  const data = colorState?.map((color, index) => ({
    ...color,
    sno: index + 1,
    key: index + 1,
    action: (
      <>
        <Link
          to={`/color/edit/${colorState[index]._id}`}
          className="text-danger text-lg md:text-xl"
        >
          <BiEdit className="inline-block align-middle" />
        </Link>
        <button
          className="ml-3 text-danger text-lg md:text-xl bg-transparent border-0"
          onClick={() => showModal(colorState[index]._id)}
        >
          <AiFillDelete className="inline-block align-middle" />
        </button>
      </>
    ),
  }));

  //Delete Color API
  const HandleDeleteColor = (e) => {
    dispatch(deleteColor(e)).then(() => {
      dispatch(getColors());
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
      <h6>Color-List</h6>
      <Table
        columns={columns}
        dataSource={data}
        onRow={(record) => ({ onClick: () => handleRowClick(record) })}
      />
      <MyModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          HandleDeleteColor(colorId);
        }}
        title="Are you sure you want to delete this Color?"
      />
    </>
  );
};

export default ColorList;
