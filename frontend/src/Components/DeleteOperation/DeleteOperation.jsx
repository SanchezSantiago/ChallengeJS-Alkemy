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
      <Modal title="Delete operation" width='300px'  visible={isModalVisible} onCancel={handleCancel} footer={null}>
          <div>
              <h1>¿Delete operation?</h1>
              <Button onClick={handleCancel} style={{marginLeft: '50px'}}>Close</Button>
              <Button type="danger" onClick={handleSubmit} style={{marginLeft: '5px'}}>Delete</Button>
          </div>
      </Modal>
  </>
  );
  }

export default DeleteOperation