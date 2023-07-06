import React, { useEffect } from "react";
import { Descriptions } from "antd";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  blockUser,
  getUser,
  unBlockUser,
} from "../../features/customers/customerSlice";
import { Button, Divider, Radio, Space } from "antd";
const EditCustomer = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.customer?.customerById);
  console.log("user", user);
  useEffect(() => {
    dispatch(getUser(id));
  }, [dispatch,id]);
  useEffect(() => {
    dispatch(getUser(id));
  }, [dispatch, id]);

  const handleBlock = () => {
    dispatch(blockUser(id)).then(() => {
      dispatch(getUser(id));
    });
  };

  const handleUnBlock = () => {
    dispatch(unBlockUser(id)).then(() => {
      dispatch(getUser(id));
    });
  };
  return (
    <>
      <Descriptions title="Customer Info" layout="vertical">
        <Descriptions.Item label="FullName">
          {user?.firstname + " " + user?.lastname}
        </Descriptions.Item>
        <Descriptions.Item label="Telephone">{user?.mobile}</Descriptions.Item>
        <Descriptions.Item label="Email">{user?.email}</Descriptions.Item>
        {user?.city && (
          <Descriptions.Item label="Live">{user?.city}</Descriptions.Item>
        )}
        {user?.address && (
          <Descriptions.Item label="Address" span={2}>
            {user?.address}
          </Descriptions.Item>
        )}
        {user?.isBlocked === true && (
          <Descriptions.Item label="user Status" labelStyle={{ color: "red" }}>
            This user has been blocked by Admin!
          </Descriptions.Item>
        )}
      </Descriptions>
    {user?.isBlocked === false &&  <Button type="default" onClick={handleBlock}>
        Block
      </Button>}
      {user?.isBlocked === true && <Button type="default" onClick={handleUnBlock}>
        UnBlock
      </Button>}
    </>
  );
};

export default EditCustomer;
