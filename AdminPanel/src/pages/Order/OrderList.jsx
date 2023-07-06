import React from "react";
import { deleteOrder, getAllOrders } from "../../features/Order/OrderSlice";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "antd";
import MyModal from "../../components/MyModal";
import { AiFillDelete } from "react-icons/ai";

const OrderList = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [orderId, setOrderId] = React.useState("");
  const showModal = (e) => {
    setOpen(true);
    setOrderId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };
  const orderItems = useSelector((state) => state?.order?.orders);
  const newOrder = useSelector((state) => state?.order);

  React.useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  const columns = [
    {
      title: "SNo",
      dataIndex: "sno",
      key: "sno",
      sorter: (a, b) => a?.sno - b?.sno,
      render: (text, record, rowIndex) => rowIndex + 1,
    },

    {
      title: "Shared Product",
      children: [
        {
          title: "Product Name",
          dataIndex: ["sharedProduct", "productName"],
          key: "sharedProduct.productName",
          sorter: (a, b) =>
            a?.sharedProduct?.productName.localeCompare(
              b?.sharedProduct?.productName
            ),
          width: 150,
        },
        {
          title: "Price",
          dataIndex: ["sharedProduct", "totalPrice"],
          key: "sharedProduct.totalPrice",
          sorter: (a, b) =>
            a?.sharedProduct?.totalPrice.localeCompare(
              b?.sharedProduct?.totalPrice
            ),
          width: 150,
        },
        {
          title: "Color",
          dataIndex: ["sharedProduct", "color"],
          key: "sharedProduct.color",
          sorter: (a, b) =>
            a?.sharedProduct?.color.localeCompare(b?.sharedProduct?.color),
          width: 150,
        },
        {
          title: "Product Link",
          dataIndex: ["sharedProduct", "productLink"],
          key: "sharedProduct.productLink",
          render: (text) => <a href={text}>{text}</a>,
          width: 150,
        },
      ],
    },

    {
      title: "Order For",
      children: [
        {
          title: "Name",
          dataIndex: ["orderFor", "name"],
          key: "orderFor.name",
          sorter: (a, b) => a?.orderFor?.name.localeCompare(b?.orderFor?.name),
          width: 150,
        },
      ],
    },

    {
      title: "Order By",
      children: [
        {
          title: "Name",
          dataIndex: ["orderBy", "name"],
          key: "orderBy.name",
          sorter: (a, b) => a?.orderBy?.name.localeCompare(b?.orderBy?.name),
          width: 150,
        },
        {
          title: "Email",
          dataIndex: ["orderBy", "email"],
          key: "orderBy.email",
          sorter: (a, b) =>
            a?.orderBy?.email.localeCompare(b?.orderBy?.email),
        },
      ],
    },
    {
      title: "Shared At",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: (a, b) => new Date(a?.createdAt) - new Date(b?.createdAt),
      render: (text) => {
        const date = new Date(text);
        const options = {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
        };
        return date.toLocaleDateString(undefined, options);
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <>
          {console.log(record)}
          <button
            className="ml-3 text-danger text-lg md:text-xl bg-transparent border-0"
            onClick={() => showModal(record?.key)}
          >
            <AiFillDelete className="inline-block align-middle" />
          </button>
        </>
      ),
    },
  ];

  const data = orderItems?.map((order, index) => ({
    key: order?._id,
    sno: index + 1,
    sharedProduct: {
      productName: order?.sharedProduct?.productName,
      totalPrice: order?.sharedProduct?.totalPrice,
      color: order?.sharedProduct?.color,
      productLink: order?.sharedProduct?.productLink,
    },
    orderFor: {
      name: order?.orderFor?.name,
    },
    orderBy: {
      name: order?.orderBy?.name,
      email: order?.orderBy?.email,
    },
    createdAt: order?.createdAt,
  }));

  //Delete Order API
  const HandleDeleteOrder = (e) => {
    dispatch(deleteOrder(e)).then(() => {
      dispatch(getAllOrders());
    });
    setOpen(false);
  };
  const handleRowClick = (record) => {
    console.log("Clicked Row:", record);
  };
  return (
    <>
      <h6>Order-List</h6>
      <div className="overflow-x-auto">
        <Table
          columns={columns}
          dataSource={data}
          bordered
          size="middle"
          onRow={(record) => ({ onClick: () => handleRowClick(record) })}
        />
      </div>
      <MyModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          HandleDeleteOrder(orderId);
        }}
        title="Are you sure you want to delete this Order?"
      />
    </>
  );
};

export default OrderList;
