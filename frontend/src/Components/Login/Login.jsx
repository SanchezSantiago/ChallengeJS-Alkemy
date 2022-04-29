import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Form, Input, Button, message } from 'antd';
import useAuth from '../../hooks/useAuth';
const Axios = require('axios');

const Login = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userData, setUserData] = useState({
    username: '',
    password: '',
  });
  const navigate = useNavigate();
  const { setAuth } = useAuth();
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
    Axios.post('http://localhost:3001/api/users/login', userData).then((response) => {
      const {data} = response;
      setAuth({username: userData.username, token: data.token});
      console.log(data.token)
      console.log(response)
      navigate('/home', {replace: true});
    }
  );

  };
  const fail = () =>{
    message.error("Error! there are fields that are required!")
  }; 
  return (
    <>
      <Button type="primary" onClick={openModal} style={{width: '150px', height: '50px'}}>
        SignUp
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
        <Input.Password
        onChange={handleOperationData('password')}
         placeholder='Password' 
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

export default Login;