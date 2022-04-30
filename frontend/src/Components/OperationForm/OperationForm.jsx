import React, {useState} from 'react'

import './OperationForm.css'
import { Form, Input, Button, Card, DatePicker, Radio, message } from 'antd';
import useAuth from "../../hooks/useAuth";
import config from '../../api';

const Axios = require('axios');

const OperationForm = () => {
  const {auth} = useAuth();
  const [operationData, setOperationData] = useState({
    concept: '',
    amount: '',
    date: '',
    type: ''
  });

  const handleOperationData = (key) => (event) => { //Set operation data
    setOperationData({ ...operationData, [key]: event.target.value });
  };

  const handleSubmit = () =>{ //Post data to the database
    if(operationData.type === 'Expense'){setOperationData(operationData.amount *= -1)} //Set to negative if 'Expense'
    Axios.post('http://localhost:3001/api/operations/postoperation', operationData, config(auth.token));
    message.success('Operation added successfully!');
  };
  const fail = () =>{
    message.error("Error! there are fields that are required!")
  }

  const handleDate = (date,dateString) => {
    operationData.date = dateString; //Set the date of the operation
  };



  return (

  <Card className='Card-form'>
    <h1>New operation</h1>
    <Form
      name="basic"
      initialValues={{ remember: true }}
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
         placeholder='Input concept. Ex: Refrigerator'/>
      </Form.Item>
      <Form.Item
        label="Type"
        name="type"
        rules={[{ required: true, message: 'Please select one!' }]}
      >
        <Radio.Group onChange={handleOperationData('type')}>
          <Radio value={'Income'}>Income</Radio>
          <Radio value={'Expense'}>Expense</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        label="Amount $"
        name="amount"
        rules={[{ required: true, message: 'Please input the amount!' }]}
      >
        <Input
        type="number"
        onChange={handleOperationData('amount')}
         placeholder='Use dot. Ex: $1000.54' 
         />
      </Form.Item>

      <Form.Item
        label="Date"
        name="date"
        rules={[{ required: true, message: 'Please input the date!' }]}
      >
        <DatePicker 
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
    </Card>

  );
};



export default OperationForm;