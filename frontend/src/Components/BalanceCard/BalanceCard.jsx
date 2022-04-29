import React, { useState, useEffect } from 'react'
import useAuth from "../../hooks/useAuth";
import config from '../../api';
import './BalanceCard.css'

//ANTD
import { Card} from 'antd';

const Axios = require('axios');


//COMPONENT 'BalanceCard'
const BalanceCard = () => {
    const {auth} = useAuth();
    const [budget, setBudget] = useState([]);

    const getBudget = async() =>{
        const resp = await Axios.get('http://localhost:3001/api/operations/getBudget', config(auth.token));
        setBudget((Math.round(resp.data[0].budget * 100) / 100).toLocaleString(('en-US', {
            style: 'currency',
            currency: 'USD',
        }))); //With the math.round function now have that "money format"
    }
    useEffect(()=>{
        getBudget()
    });

    return (
    <div>
        <Card className='Card'>
            <h5>Your currrent balance:</h5>
            <h2>${budget? budget : 0}</h2>
        </Card>
    </div>
    )
    }

export default BalanceCard;