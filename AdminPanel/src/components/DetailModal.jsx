import React from "react";
import { Modal } from "antd";

const DetailModal = (props) => {
  const { modalTitle, open, hideModal, performAction, children } = props;
  return (
    <Modal
    title={modalTitle}
    visible={open}
    onOk={performAction}
    onCancel={hideModal}
    footer={false}
    centered
    className="w-full max-w-lg"
    okButtonProps={{ style: { backgroundColor: "rgb(255 0 0)" } }}
  >
    {children}
  </Modal>
  );
};

export default DetailModal;