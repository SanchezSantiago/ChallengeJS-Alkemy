import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import { Modal, Button } from 'antd';

const Login = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  let navigate = useNavigate();
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    navigate('/home', {replace: true});

  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal} style={{width: '150px', height: '50px'}}>
        SignUp
      </Button>
      <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};

export default Login;