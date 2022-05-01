import React, {useState} from 'react'
import './OperationForm.css'
//ANTD
import { Form, Input, Button, Card, DatePicker, Radio, message, Select } from 'antd';
//COMPONENTS
import useAuth from "../../hooks/useAuth";
import config from '../../api';

const Axios = require('axios');

const OperationForm = () => {
  const {auth} = useAuth();
  const { Option } = Select;
  const [operationData, setOperationData] = useState({
    concept: '',
    amount: '',
    date: '',
    category:'none',
    type: ''
  });

  const handleOperationData = (key) => (event) => { //Set operation data
    setOperationData({ ...operationData, [key]: event.target.value });
  };

  const handleSubmit = () =>{ //Post data to the database
    Axios.post('http://localhost:3001/api/operations/postoperation', operationData, config(auth.token));
    message.success('Operation added successfully!');
  };
  const fail = () =>{
    message.error("Error! there are fields that are required!")
  }

  const handleDate = (date,dateString) => {
    operationData.date = dateString; //Set the date of the operation
  };
  const handleSelectData = (value) => {
    operationData.category = value;//Set the category of the operation
  }



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
        label="Category"
      >
        <Select name="category" defaultValue ='none' style={{ width: '100%' }} onChange={(value) => {handleSelectData(value)}} >
          <Option value="none">None</Option>
          <Option value="Shopping">Shopping</Option>
          <Option value="Entertainment">Entertainment</Option>
          <Option value="Restaurants and bars">Restaurants and bars</Option>
          <Option value="Health and sports">Health and sports</Option>
          <Option value="Services">Services</Option>
          <Option value="Supermarket">Supermarket</Option>
          <Option value="Transports">Transports</Option>
          <Option value="Vacations">Vacations</Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Date"
        name="date"
        style={{marginRight: '50px'}}
        rules={[{ required: true, message: 'Please input the date!' }]}
      >
        <DatePicker 
        onChange={handleDate} 
        size='large'
        />
      </Form.Item>


      <Form.Item >
        <Button type="primary" htmlType='submit'>
          Add operation
        </Button>
      </Form.Item>
    </Form>
    </Card>

  );
};



export default OperationForm;