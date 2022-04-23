import React from 'react'
import './BalanceCard.css'
//ANTD
import { Card} from 'antd';



//COMPONENT 'BalanceCard'
const BalanceCard = () => {


return (
<div>
    <Card className='Card'>
        <h5>Your currrent balance:</h5>
        <h2>$10000</h2>
    </Card>
</div>
)
}

export default BalanceCard