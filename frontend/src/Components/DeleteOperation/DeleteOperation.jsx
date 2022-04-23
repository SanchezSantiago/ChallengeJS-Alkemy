import React, { useState } from "react";
import { Modal, Button} from 'antd';
import {BsFillTrashFill} from 'react-icons/bs'
import axios from "axios";

const DeleteOperation = (props) => {
const [isModalVisible, setIsModalVisible] = useState(false);

const showModal = () => {
setIsModalVisible(true);

};


const handleCancel = () => {
setIsModalVisible(false);
};

const handleSubmit = async (event) => {
     try{   
    await axios.delete(`http://localhost:3001/api/operations/${props.operationInfo.id}`);
     handleCancel();

    } catch (err){
      console.log(err)
    }
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