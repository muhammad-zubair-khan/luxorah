import React from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getCategories,
  deleteCategory,
} from "../../../features/Cataglog/Category/CategorySlice";
import MyModal from "../../../components/MyModal";
import { showSuccessMessage } from "../../../functions";
const CategoryList = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [catId, setCatId] = React.useState("");
  const showModal = (e) => {
    setOpen(true);
    setCatId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };
  const categoryState = useSelector((state) => state.category.categories);
  console.log("categoryState", categoryState);
  const newCat = useSelector((state) => state.category);
  const { isSuccess, deletedCategory } = newCat;
  const [columns, setColumns] = React.useState([]);

  React.useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  React.useEffect(() => {
    if (categoryState && categoryState.length > 0) {
      const firstCategory = categoryState[0];
      const columnKeys = Object.keys(firstCategory).filter(
        (key) =>
          key !== "__v" &&
          key !== "updatedAt" &&
          key !== "slug" &&
          key !== "images"
      );
      const columnsData = columnKeys?.map((key, index) => {
        if (key === "_id") {
          return {
            title: "SNo",
            dataIndex: "sno",
            key: "sno",
            sorter: (a, b) => a.key?.length - b.key?.length,
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
          title: key?.toUpperCase(),
          dataIndex: key,
          key,
          sorter: (a, b) => a[key]?.localeCompare(b[key]),
        };
      });
      // Add the action field to the columnsData
      columnsData?.push({
        title: "ACTION",
        dataIndex: "action",
        key: "action",
      });

      setColumns(columnsData);
    }
  }, [categoryState]);

  const data = categoryState?.map((category, index) => ({
    ...category,
    sno: index + 1,
    key: index + 1,
    action: (
      <>
        <Link
          to={`/category/edit/${categoryState[index]?._id}`}
          className="text-danger text-lg md:text-xl"
        >
          <BiEdit className="inline-block align-middle" />
        </Link>
        <button
          className="ml-3 text-danger text-lg md:text-xl bg-transparent border-0"
          onClick={() => showModal(categoryState[index]?._id)}
        >
          <AiFillDelete className="inline-block align-middle" />
        </button>
      </>
    ),
  }));

  //Delete Category API
  const HandleDeleteCategory = (e) => {
    dispatch(deleteCategory(e)).then(() => {
      dispatch(getCategories());
    });
    setOpen(false);
  };

  const handleRowClick = (record) => {
    console.log("Clicked Row:", record);
  };
  return (
    <>
      <h6>Category List</h6>
      <Table
        columns={columns}
        dataSource={data}
        onRow={(record) => ({ onClick: () => handleRowClick(record) })}
      />
      <MyModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          HandleDeleteCategory(catId);
        }}
        title="Are you sure you want to delete this Category?"
      />
    </>
  );
};

export default CategoryList;
