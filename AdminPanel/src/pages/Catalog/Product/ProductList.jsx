import React from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  getProducts,
} from "../../../features/Cataglog/Product/ProductSlice";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import MyModal from "../../../components/MyModal";
import { showSuccessMessage } from "../../../functions";

const ProductList = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getProducts());
  }, []);

  const productState = useSelector((state) => state?.product?.products?.products);

  const [open, setOpen] = React.useState(false);
  const [proId, setProId] = React.useState("");
  const showModal = (e) => {
    setOpen(true);
    setProId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const [columns, setColumns] = React.useState([]);
  React.useEffect(() => {
    if (productState && productState.length > 0) {
      const firstProduct = productState[0];
      const columnKeys = Object.keys(firstProduct).filter(
        (key) =>
          key !== "__v" &&
          key !== "description" &&
          key !== "images" &&
          key !== "slug" &&
          key !== "ratings" &&
          key !== "totalRatings" &&
          key !== "updatedAt"
      );
      const columnsData = columnKeys?.map((key, index) => {
        if (key === "_id") {
          return {
            title: "SNo",
            dataIndex: "sno",
            key: "sno",
            sorter: (a, b) => a.key?.length - b?.key.length,
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
  }, [productState]);

  const data = productState?.map((product, index) => {
    const { _id, category, color, ...rest } = product;
    const formattedCategory = typeof category === 'object' ? [category.title] : category;
    const formattedColors = color.map((c) => c.title).join(', '); // Extract and join the color titles
  
    const formattedData = {};
    for (let key in rest) {
      if (typeof rest[key] === 'object') {
        formattedData[key] = JSON.stringify(rest[key]);
      } else {
        formattedData[key] = rest[key];
      }
    }
  
    return {
      ...formattedData,
      sno: index + 1,
      key: _id,
      category: formattedCategory,
      color: formattedColors, // Use the formattedColors variable
      action: (
        <>
          <Link
            to={`/product/edit/${_id}`}
            className="text-danger text-lg md:text-xl"
          >
            <BiEdit className="inline-block align-middle" />
          </Link>
          <button
            className="ml-0 text-danger text-lg md:text-xl bg-transparent border-0"
            onClick={() => showModal(_id)}
          >
            <AiFillDelete className="inline-block align-middle" />
          </button>
        </>
      ),
    };
  });
  
  
  
  //Delete Product API
  const HandleDeleteProduct = (e) => {
    dispatch(deleteProduct(e)).then(() => {
      dispatch(getProducts());
    });
    setOpen(false);
  };

  const handleRowClick = (record) => {
    console.log("Clicked Row:", record);
  };
  return (
    <>
      <h6>Product List</h6>
      <Table
        columns={columns}
        dataSource={data}
        onRow={(record) => ({ onClick: () => handleRowClick(record) })}
      />
      <MyModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          HandleDeleteProduct(proId);
        }}
        title="Are you sure you want to delete this Product?"
      />
    </>
  );
};

export default ProductList;
