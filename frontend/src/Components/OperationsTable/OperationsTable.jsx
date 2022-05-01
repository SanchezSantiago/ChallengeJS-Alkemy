import React, {useEffect, useState} from 'react'
import {Table} from 'antd';
import './OperationsTable.css'
//COMPONENTS
import useAuth from "../../hooks/useAuth";
import config from '../../api';
//MISC
import moment from 'moment'; //date format


const Axios = require('axios');
const OperationsTable = () => {
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
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
    filters: [ //Filters are declared in this field.
      {
        text: 'Shopping',
        value: 'Shopping',
      },
      {
        text: 'Entertainment',
        value: 'Entertainment',
      },
      {
        text: 'Restaurants and bars',
        value: 'Restaurants and bars',
      },
      {
        text: 'Health and sports',
        value: 'Health and sports',
      },
      {
        text: 'Services',
        value: 'Services',
      },
      {
        text: 'Supermarket',
        value: 'Supermarket',
      },
      {
        text: 'Transports',
        value: 'Transports',
      },
      {
        text: 'Vacations',
        value: 'Vacations',
      },
      {
        text: 'none',
        value: 'none',
      },
    ],
    onFilter: (value, record) => record.category.indexOf(value) === 0
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type'
  },

];


  const {auth} = useAuth();
  const [data, setData] = useState([]);
  const getAllOperations = async() => {

    const resp = await Axios.get('http://localhost:3001/api/operations/getoperations', config(auth.token));
    setData(resp.data);

  }
  useEffect(()=>{
    getAllOperations(); //The comment below disable a eslint warning
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return(
    <div>
      <Table columns={columns} dataSource={data} pagination={false} />
    </div>
  );
}

export default OperationsTable