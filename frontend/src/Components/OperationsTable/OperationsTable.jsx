import React, {useEffect, useState} from 'react'
import {Table} from 'antd';
import Axios from 'axios';
import useAuth from "../../hooks/useAuth";
import config from '../../api';
import moment from 'moment'; //With this the date looks better

import './OperationsTable.css'

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
      return (value > 0? "+$" + value.toLocaleString("es") : "-$" + (value * -1).toLocaleString("es")); //If the value is negative, displays in negative monetary format
    },
    responsive: ["sm"]
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    render: (value) => {
      return moment(value).utc().format('YYYY/MM/DD'); //Transform the date format
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


const OperationsTable = () => {
  const {auth} = useAuth();
  const [data, setData] = useState([]);
  const getAllOperations = async() => {

    const resp = await Axios.get('http://localhost:3001/api/operations/getoperations', config(auth.token));
    setData(resp.data);

  }
  useEffect(()=>{
    getAllOperations()
  });

  return(
    <div>
      <Table columns={columns} dataSource={data} pagination={false} />
    </div>
  );
}

export default OperationsTable