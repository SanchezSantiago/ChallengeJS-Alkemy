import React from 'react'
//CSS
import './Home.css'
//COMPONENTS
import BalanceCard from '../../Components/BalanceCard/BalanceCard';

//PAGE 'Home'
const Home = () => {

  return (
  <>
    <div className='Home'>
    <BalanceCard/>
    </div>
  </>
  );
}

export default Home