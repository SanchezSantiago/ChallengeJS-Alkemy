import React, { useState} from 'react';
//ANTD
import { Modal, Button, Input, Form, DatePicker, message } from 'antd';
//COMPONENTS
import useAuth from "../../hooks/useAuth";
import config from '../../api';
//MISC
import {BsFillPencilFill} from 'react-icons/bs'; //Icons
import moment from 'moment'; //date format

const Axios = require('axios');

const EditOperationModal = (props) => {
  const {auth} = useAuth();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [operationData, setOperationData] = useState('');
  const [form] = Form.useForm();
  const dateFormat = "YYYY/MM/DD";

  const showModal = () => {
    setOperationData({ //Set row values in the operationData
      concept: props.operationInfo.concept,
      amount: props.operationInfo.amount,
      date: props.operationInfo.date,
    });
    setIsModalVisible(true);
  };
 
  const initialValues = {
    concept: operationData.concept,
    amount: operationData.amount,
    date: moment(operationData.date) //date: YYYY-MM-DDT03:00:00.000Z
  };

  const handleCancel = () => {
    setIsModalVisible(false);

  };

  const handleOperationData = (key) => (event) => { //Set operation data
    setOperationData({ ...operationData, [key]: event.target.value });
  };
  
  const handleSubmit = async () =>{ //Put data to the database
       await Axios.put(`http://localhost:3001/api/operations/update/${props.operationInfo.id}`, operationData, config(auth.token));
       message.success('Operation edited successfully!');
      handleCancel(); //Close modal
  };

  const fail = () =>{
    message.error('Error! there are fields that are required!');
  }


  const handleDate = (date,dateString) => {
    operationData.date = dateString; //Set the date of the operation
  };

  return (
    <>
      <Button onClick={showModal}>
        <BsFillPencilFill/>
      </Button>
      <Modal title="Edit operation" visible={isModalVisible} onCancel={handleCancel} footer={null}>
      <Form
      form={form}
      name="basic"
      initialValues={initialValues}
      autoComplete="off"
      onFinish={handleSubmit}
      onFinishFailed={fail}

    >
      <Form.Item
        label="Concept"
        name="concept"
        rules={[{ required: true, message: 'Please input the concept!' }]}

      >
        <Input
        type='text'
        
        onChange={handleOperationData('concept')}
        />
      </Form.Item>

      <Form.Item
        label="Amount $"
        name="amount"
        rules={[{ required: true, message: 'Please input the amount!' }]}
      >
        <Input
        type="number"
        onChange={handleOperationData('amount')}
         placeholder={operationData.amount} 
         />
      </Form.Item>

      <Form.Item
        label="Date"
        name="date"
        style={{marginLeft: '120px'}}
        rules={[{ required: true, message: 'Please input the date!' }]}
      >
        <DatePicker 
        format={dateFormat} 
        onChange={handleDate}
        
        size='large'
        />
      </Form.Item>
      <Form.Item >
        <Button type="primary" htmlType='submit'size='large' style={{width: '100%'}}>
          Edit Operation
        </Button>
      </Form.Item>
    </Form>
        
      </Modal>
    </>
  );
};

export default EditOperationModal;