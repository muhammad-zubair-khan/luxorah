import React from "react";
import { Modal } from "antd";

const MyModal = (props) => {
  const { open, hideModal, performAction, title } = props;
  return (
    <Modal
    title="Confirmation"
    visible={open}
    onOk={performAction}
    onCancel={hideModal}
    okText="Confirm"
    cancelText="Cancel"
    centered
    className="w-full max-w-lg"
    okButtonProps={{ style: { backgroundColor: "rgb(255 0 0)" } }}
  >
    <p>{title}</p>
  </Modal>
  );
};

export default MyModal;