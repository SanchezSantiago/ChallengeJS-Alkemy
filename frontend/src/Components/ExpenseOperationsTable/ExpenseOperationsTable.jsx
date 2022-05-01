import React, {useState, useEffect} from 'react';
//ANTD
import {Table} from 'antd';
//COMPONENTS
import EditOperationModal from '../EditOperationModal/EditOperationModal';
import DeleteOperation from '../DeleteOperation/DeleteOperation';
import useAuth from "../../hooks/useAuth";
import config from '../../api';
//MISC
import moment from 'moment';

const Axios = require('axios');

const ExpenseOperationsTable = () => {
  const {auth} = useAuth();
  const [data, setData] = useState([]);

  const getExpenseOperations = async() =>{
    const resp = await Axios.get(`http://localhost:3001/api/operations/getoperationbytype/${'Expense'}`,config(auth.token));
    setData(resp.data);
  }
  
  useEffect(()=>{
    getExpenseOperations(); //The comment below disable a eslint warning
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
const columns = [
  { //This column joins two columns
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
      return ("-$" + (value * -1).toLocaleString("es")); //Displays in negative monetary format
    },
    responsive: ["sm"]
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    render: (value) => {
      return moment(value).utc().format('MM/DD/YYYY'); //Transform the date format to USA date format
    }
  },
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type'
  },
  {
    title: 'Action',
    key: 'action',
    render: (record) => {
      return(
        <div  style={{display: 'flex'}}>
          <EditOperationModal operationInfo = {record}/>
          <br />
          <DeleteOperation operationInfo = {record}/>
        </div>
      )
    }
  },


];



  return (
    <Table columns={columns} dataSource={data} pagination={{ pageSize: 10}} size='small'/>
  )
}


export default ExpenseOperationsTable