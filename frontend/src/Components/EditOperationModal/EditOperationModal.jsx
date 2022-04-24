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
    form.setFieldsValue({ //This will put a default value in every input of the form
      concept: props.operationInfo.concept,
      amount: props.operationInfo.amount,
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
    try{
       await Axios.put(`http://localhost:3001/api/operations/${props.operationInfo.id}`, operationData);
       message.success('Operation edited successfully!');
      handleCancel();
    } catch (err){
      console.log(err)
    }
    
    
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
      name="basic"
      initialValues={{ remember: true }}
      autoComplete="off"
      form={form}
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
        onChange={handleDate}
        placeholder={moment(operationData.date).utc().format('YYYY/MM/DD')}//For some reason it crashes when i use "default Value"... Anymays
        size='large'
        />
      </Form.Item>
      <Form.Item >
        <Button type="primary" onClick={handleSubmit} onSubmit={handleSubmit}>
          Submit
        </Button>
      </Form.Item>
    </Form>
        
      </Modal>
    </>
  );
};

export default EditOperationModal;