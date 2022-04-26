import React, { useState} from 'react';
import { Modal, Button, Input, Form, DatePicker, message } from 'antd';
import {BsFillPencilFill} from 'react-icons/bs';
import moment from 'moment';
const Axios = require('axios');

const EditOperationModal = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [operationData, setOperationData] = useState('');
  const [form] = Form.useForm();

  const showModal = () => {
    setOperationData({ //Set row values in the operationData
      concept: props.operationInfo.concept,
      amount: props.operationInfo.amount,
      date: props.operationInfo.date,
    });

    setIsModalVisible(true);
  };


  const handleCancel = () => {
    setIsModalVisible(false);

  };

  

  const handleOperationData = (key) => (event) => { //Set operation data
    setOperationData({ ...operationData, [key]: event.target.value });
  };
  

  const handleSubmit = async () =>{ //Put data to the database
      operationData.date = moment(operationData.date).utc().format('YYYY/MM/DD') //if they didn't change the date, this will be put into a format that SQL can accept
       await Axios.put(`http://localhost:3001/api/operations/${props.operationInfo.id}`, operationData);
       message.success('Operation edited successfully!');
       console.log(operationData)
      handleCancel();
  };
  const fail = () =>{
    message.error('Edition failed, there are fields that are required!');
  }
  const dateFormat = "YYYY/MM/DD";

const initialValues = {
  concept: operationData.concept,
  amount: operationData.amount,
  date: moment(operationData.date)
};

  const handleDate = (date,dateString) => {
    operationData.date = dateString; //Set the date of the operation
  };

  return (
    <>
      <Button onClick={showModal}>
        <BsFillPencilFill/>
      </Button>
      <Modal title="Edit" visible={isModalVisible} onCancel={handleCancel} footer={null}>
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
        rules={[{ required: true, message: 'Please input the date!' }]}
      >
        <DatePicker 
        format={dateFormat} 
        onChange={handleDate}
        size='large'
        />
      </Form.Item>
      <Form.Item >
        <Button type="primary" htmlType='submit'>
          Submit
        </Button>
      </Form.Item>
    </Form>
        
      </Modal>
    </>
  );
};

export default EditOperationModal;