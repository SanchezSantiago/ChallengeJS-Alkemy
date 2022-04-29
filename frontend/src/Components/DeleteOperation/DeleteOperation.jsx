import React, { useState } from "react";
import { Modal, Button, message} from 'antd';
import {BsFillTrashFill} from 'react-icons/bs'
import useAuth from "../../hooks/useAuth";
import config from '../../api';
import axios from "axios";

const DeleteOperation = (props) => {
  const {auth} = useAuth();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };


  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = async (event) => {
  
        await axios.delete(`http://localhost:3001/api/operations/delete/${props.operationInfo.id}`, config(auth.token));
        message.success('Operation deleted!');
        handleCancel();
    }
  return (
  <>
      <Button onClick={showModal}>
          <BsFillTrashFill />
      </Button>
      <Modal title="Delete" visible={isModalVisible} onCancel={handleCancel} footer={null}>
          <div>
              <h1>Delete operation</h1>
              <Button type="primary" onClick={handleSubmit}>Confirm</Button>
              <Button onClick={handleCancel} >Close</Button>
          </div>
      </Modal>
  </>
  );
  }

export default DeleteOperation