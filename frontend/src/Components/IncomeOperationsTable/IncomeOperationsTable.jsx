import React, {useState, useEffect} from 'react';
import {Table} from 'antd';
import moment from 'moment';

const Axios = require('axios');
const IncomeOperationsTable = () => {
  const [data, setData] = useState([]);


  

const columns = [
  { //This column joins two columns, so the table looks good in responsive!
    title: "Concept // Amount", 
    render: (record) => (
      <React.Fragment>
        {record.concept}
        <hr />
        ${record.amount}
      </React.Fragment>
    ),
    responsive: ["xs"]
  },
  {
    title: 'Concept',
    dataIndex: 'concept',
    key: 'concept',
    responsive: ["sm"]
  
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
    render:(value)=>{
      return "$" + value.toLocaleString("es");
    },
    responsive: ["sm"]
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    render: (value) => {
      return moment(value).utc().format('MM/DD/YYYY'); //Transform the date format
    }
  },
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category'
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type'
  },


];
const getIncomeOperations = async() =>{
  const resp = await Axios.get('http://localhost:3001/api/operations/incomes');
  setData(resp.data);
}
  useEffect(()=>{
    getIncomeOperations()
  },[data]);


  return (
    <Table columns={columns} dataSource={data} pagination={{ pageSize: 10}} size='small'/>
  )
}


export default IncomeOperationsTable