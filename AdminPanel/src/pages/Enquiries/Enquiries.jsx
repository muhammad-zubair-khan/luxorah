import React,{useEffect} from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MyModal from "../../components/MyModal";
import { showSuccessMessage } from "../../functions";
import { deleteContact, getContacts } from "../../features/Contact/ContactSlice";
const Enquiries = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [contactId, setContactId] = React.useState("");
  const showModal = (e) => {
    setOpen(true);
    setContactId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };
  const contact = useSelector((state) => state?.contact?.contacts);
  const newContact = useSelector((state) => state?.contact);
const {isSuccess} = useSelector((state)=>state?.contact)
  const [columns, setColumns] = React.useState([]);

  React.useEffect(() => {
    dispatch(getContacts());
  }, [dispatch]);

  React.useEffect(() => {
    if (contact && contact.length > 0) {
      const firstContact = contact[0];
      const columnKeys = Object.keys(firstContact).filter(
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
  }, [contact]);

  const data = contact?.map((cont, index) => ({
    ...cont,
    sno: index + 1,
    key: index + 1,
    action: (
      <>
        
        <button
          className="ml-3 text-danger text-lg md:text-xl bg-transparent border-0"
          onClick={() => showModal(contact[index]?._id)}
        >
          <AiFillDelete className="inline-block align-middle" />
        </button>
      </>
    ),
  }));
  useEffect(()=>{
    if(isSuccess){
      dispatch(getContacts());
    }
  },[isSuccess])

  //Delete Contact API
  const HandleDeleteContact = (e) => {
    dispatch(deleteContact(e)).then(()=>{
      dispatch(getContacts());
    })
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
          HandleDeleteContact(contactId);
        }}
        title="Are you sure you want to delete this Brand?"
      />
    </>
  )
}

export default Enquiries