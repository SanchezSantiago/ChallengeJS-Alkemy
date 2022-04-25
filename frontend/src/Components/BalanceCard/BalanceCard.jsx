import React, { useState, useEffect } from 'react'
import './BalanceCard.css'

//ANTD
import { Card} from 'antd';

const Axios = require('axios');


//COMPONENT 'BalanceCard'
const BalanceCard = () => {
const [budget, setBudget] = useState([]);

const getBudget = async() =>{
    const resp = await Axios.get('http://localhost:3001/api/operations/getBudget');
    setBudget((Math.round(resp.data[0].budget * 100) / 100).toFixed(2)); //With the math.round function now have that "money format"
}
useEffect(()=>{
    getBudget()
},[budget]);

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