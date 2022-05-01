import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//ANTD
import { Modal, Button } from 'antd';

const LogoutModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    navigate('/'); 
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };



  return (
    <>
      <Button type="primary" onClick={showModal}>
        Logout
      </Button>
      <Modal title="¿Logout?" visible={isModalVisible} footer={null} width='300px'>
        <Button onClick={handleCancel} style={{marginLeft: '42px'}} >Logout</Button>
        <Button type="primary" onClick={handleOk} style={{marginLeft: '5px'}}>Logout</Button>
      </Modal>
    </>
  );
};

export default LogoutModal;