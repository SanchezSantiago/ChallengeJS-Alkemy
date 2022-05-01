import React, {useEffect, useState} from 'react'
import {Table} from 'antd';
import Axios from 'axios';
import useAuth from "../../hooks/useAuth";
import config from '../../api';
import moment from 'moment'; //With this the date looks better

import './OperationsTable.css'

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
      return (value > 0? "+$" + value.toLocaleString("es") : "-$" + (value * -1).toLocaleString("es")); //If the value is negative, displays in negative monetary format
    },
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
    getAllOperations(); //The comment above disable a eslint warning
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return(
    <div>
      <Table columns={columns} dataSource={data} pagination={false} />
    </div>
  );
}

export default OperationsTable