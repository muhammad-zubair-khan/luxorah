import React from "react";
import { Table, Modal } from "antd";
import { getUsers } from "../../features/customers/customerSlice";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MyModal from "../../components/MyModal";
import DetailModal from "../../components/DetailModal";

const Customers = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getUsers());
  }, []);
  const customerState = useSelector((state) => state?.customer?.customers);
  console.log("customer-state", customerState);
  const [columns, setColumns] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [cusId, setCusId] = React.useState("");
  const showModal = (e) => {
    setOpen(true);
    setCusId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };
  React.useEffect(() => {
    if (customerState && customerState.length > 0) {
      const firstCustomer = customerState[0];
      const columnKeys = Object.keys(firstCustomer).filter(
        (key) =>
          key !== "__v" &&
          key !== "updatedAt" &&
          key !== "isBlocked" &&
          key !== "role" &&
          key !== "wishList" &&
          key !== "role" &&
          key !== "token" &&
          key !== "googleId"
      );
      const columnsData = columnKeys.map((key, index) => {
        if (key === "_id") {
          return {
            title: "SNo",
            dataIndex: "sno",
            key: "sno",
            render: (text, record, rowIndex) => rowIndex + 1,
          };
        }
        if (key === "picture") {
          return {
            title: "Picture",
            dataIndex: "picture",
            key: "picture",
            render: (picture) => (
              <img
                src={picture}
                alt="Customer Picture"
                style={{ width: "50px" }}
              />
            ),
          };
        }
        
        return {
          title: key.toUpperCase(),
          dataIndex: key,
          key,
          sorter: (a, b) => a[key]?.localeCompare(b[key]),
        };
      });

      // Find the index of "SNo" column
      const snoColumnIndex = columnsData.findIndex(
        (column) => column.key === "sno"
      );
      const pictureColumnIndex = columnsData.findIndex(
        (column) => column.key === "picture"
      );
      console.log(pictureColumnIndex);

      // Move the "SNo" column to the first position
      if (snoColumnIndex > 0) {
        const snoColumn = columnsData.splice(snoColumnIndex, 1)[0];
        columnsData.unshift(snoColumn);
      }
      // Move the "Picture" column right after the "SNo" column
      if (pictureColumnIndex > snoColumnIndex + 1) {
        const pictureColumn = columnsData.splice(pictureColumnIndex, 1)[0];
        columnsData.splice(snoColumnIndex + 1, 0, pictureColumn);
      }

     
      setColumns(columnsData);
    }
  }, [customerState]);

  const data = [];
  let serialNumber = 1;
  for (let i = 0; i < customerState?.length; i++) {
    if (customerState[i]?.role !== "admin") {
      data.push({
        key: serialNumber,
        picture: customerState[i].picture,
        name: customerState[i].name,
        email: customerState[i].email,
        // createdAt: customerState[i].createdAt,
        createdAt:
          new Date(customerState[i].createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          }) +
          " " +
          new Date(customerState[i].createdAt).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
          }),
        
      });
      serialNumber++;
    }
  }
  const responsive = {
    xs: 480,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    xxl: 1600,
  };
  const [selectedRow, setSelectedRow] = React.useState(null);
  console.log("selectedRow->", selectedRow);
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const handleRowClick = (record) => {
    console.log("Clicked Row:", record);
  };
 
  return (
    <>
      <h6>Customers</h6>
      <Table
        columns={columns}
        onChange={onChange}
        dataSource={data}
        responsive={responsive}
        onRow={(record) => ({ onClick: () => handleRowClick(record) })}
        rowSelection={{
          type: "radio",
          onSelect: (record) => {
            setSelectedRow(record);
            setOpen(true);
          },
        }}
      />
      <DetailModal hideModal={hideModal} open={open} modalTitle="User Detail">
        <div className="flex">
          <div className="flex-col">
            <label htmlFor="picture" className="font-bold">
              Profile Picture
            </label>
            <img src={selectedRow?.picture} width={50} alt="profilepicture" />
            <label htmlFor="name" className="font-bold">
              Name:{" "}
            </label>
            <h3>{selectedRow?.name}</h3>
            <label htmlFor="email" className="font-bold">
              Email:{" "}
            </label>
            <h3>{selectedRow?.email}</h3>
            <label htmlFor="createdat" className="font-bold">
              CreatedAt:{" "}
            </label>
            <h3>{selectedRow?.createdAt}</h3>
          </div>
        </div>
      </DetailModal>
    </>
  );
};

export default Customers;
