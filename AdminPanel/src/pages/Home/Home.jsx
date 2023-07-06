import React from "react";
import { Column } from "@ant-design/plots";
import OrderList from "../Order/OrderList";
import { useSelector } from "react-redux";

const Home = () => {
  const orderItems = useSelector((state) => state?.order?.orders);

  // Calculate orders for each month
  const orderData = [
    { type: "Jan", sales: 0 },
    { type: "Feb", sales: 0 },
    { type: "Mar", sales: 0 },
    { type: "Apr", sales: 0 },
    { type: "May", sales: 0 },
    { type: "Jun", sales: 0 },
    { type: "July", sales: 0 },
    { type: "Aug", sales: 0 },
    { type: "Sept", sales: 0 },
    { type: "Oct", sales: 0 },
    { type: "Nov", sales: 0 },
    { type: "Dec", sales: 0 },
  ];

  orderItems.forEach((order) => {
    const month = new Date(order.createdAt).getMonth(); // Get the month from the order's createdAt date
    orderData[month].sales += 1; // Increment the sales count for the corresponding month
  });
  const config = {
    data: orderData,
    xField: "type",
    yField: "sales",
    color: ({ type }) => {
      return "rgb(4 0 255)";
    },
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      sales: {
        alias: "Orders",
      },
    },
  };
  // const config = {
  //   data,
  //   xField: "type",
  //   yField: "sales",
  //   color: ({ type }) => {
  //     return "rgb(4 0 255)";
  //   },
  //   label: {
  //     position: "middle",
  //     style: {
  //       fill: "#FFFFFF",
  //       opacity: 1,
  //     },
  //   },
  //   xAxis: {
  //     label: {
  //       autoHide: true,
  //       autoRotate: false,
  //     },
  //   },
  //   meta: {
  //     type: {
  //       alias: "Month",
  //     },
  //     sales: {
  //       alias: "Income",
  //     },
  //   },
  // };
  return (
    <div>
      <h3 className="mb-4 title">Dashboard</h3>
      {/* <div className="flex justify-between items-center gap-3">
        <div className="flex justify-between items-end flex-grow-1 bg-white p-3 roudned-3">
          <div>
            <p className="desc">Total</p>
            <h4 className="mb-0 sub-title">$1100</h4>
          </div>
          <div className="flex flex-col items-end">
            <h6>
              <BsArrowDownRight /> 32%
            </h6>
            <p className="mb-0  desc">Compared To May 2022</p>
          </div>
        </div>
        <div className="flex justify-between items-end flex-grow-1 bg-white p-3 roudned-3">
          <div>
            <p className="desc">Total</p>
            <h4 className="mb-0 sub-title">$1100</h4>
          </div>
          <div className="flex flex-col items-end">
            <h6 className="red">
              <BsArrowDownRight /> 37%
            </h6>
            <p className="mb-0  desc">Compared To May 2021</p>
          </div>
        </div>
        <div className="flex justify-between items-end flex-grow-1 bg-white p-3 roudned-3">
          <div>
            <p className="desc">Total</p>
            <h4 className="mb-0 sub-title">$1100</h4>
          </div>
          <div className="flex flex-col items-end">
            <h6 className="green">
              <BsArrowDownRight /> 42%
            </h6>
            <p className="mb-0 desc">Compared To May 2020</p>
          </div>
        </div>
      </div> */}
      <div className="mt-4">
        <h3 className="mb-5 title">Total Orders Per Month</h3>
        <div>
          <Column {...config} />
        </div>
      </div>
      <div className="mt-4">
        <h3 className="mb-5 title">Recent Orders</h3>
        <div>
          <OrderList />
        </div>
      </div>
    </div>
  );
};

export default Home;
