import React, { useState } from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
const Axios = require('axios');

const RegisterForm = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userData, setUserData] = useState({
    username: '',
    password: '',
    email: ''
  });
  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };
  const handleOperationData = (key) => (event) => { //Set operation data
    setUserData({ ...userData, [key]: event.target.value });
  };
  const handleSubmit = () =>{ //Post data to the database
    Axios.post('http://localhost:3001/api/users/register', userData).then((response) => {
      if(response.status === 209){
        message.error(response.data);
      } else{
        message.success("User created!");
        closeModal();
      }
    }
  );

  };
  const fail = () =>{
    message.error("Error! there are fields that are required!")
  }; 
  return (
    <>
      <Button type="primary" onClick={openModal} style={{width: '150px', height: '50px'}}>
        SignIn
      </Button>
      <Modal title="Register" visible={isModalVisible} onCancel={closeModal} footer={null}>
      <Form
      name="basic"
      initialValues={{ remember: true }}
      autoComplete="off"
      onFinish={handleSubmit}
      onFinishFailed={fail}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input a username!' }]}
      >
        <Input
        type='text'
        onChange={handleOperationData('username')}
         placeholder='Username'/>
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input a password!' }]}
      >
        <Input
        type="password"
        onChange={handleOperationData('password')}
         placeholder='8 characters and 1 uppercase' 
         />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please input a password!' }]}
      >
        <Input
        type="email"
        onChange={handleOperationData('email')}
         placeholder='Email' 
         />
      </Form.Item>

      <Form.Item >
        <Button type="primary" htmlType='submit' size='large' style={{width: '100%'}}>
          Submit
        </Button>
      </Form.Item>
    </Form>
      </Modal>
    </>
  );
};

export default RegisterForm;