import React, {useState, useEffect} from 'react';
import {Table} from 'antd';
import moment from 'moment';


//COMPONENTS
import EditOperationModal from '../EditOperationModal/EditOperationModal';
import DeleteOperation from '../DeleteOperation/DeleteOperation';
import useAuth from "../../hooks/useAuth";
import config from '../../api';

const Axios = require('axios');
const IncomeOperationsTable = () => {
  const {auth} = useAuth();
  const [data, setData] = useState([]);

  const getIncomeOperations = async() =>{
    const resp = await Axios.get(`http://localhost:3001/api/operations/getoperationbytype/${'Income'}`,config(auth.token));
    setData(resp.data);
  }
    useEffect(()=>{
      getIncomeOperations(); //The comment above disable a eslint warning
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);
  

const columns = [
  {
    title: 'Concept',
    dataIndex: 'concept',
    key: 'concept',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
    render:(value)=>{
      return "+$" + value.toLocaleString("es");
    },
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


export default IncomeOperationsTable