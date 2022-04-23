import React from 'react'
//CSS
import './Home.css'
//COMPONENTS
import BalanceCard from '../../Components/BalanceCard/BalanceCard';
import OperationsTable from '../../Components/OperationsTable/OperationsTable';

//PAGE 'Home'
const Home = () => {

  return (
  <>
    <div className='Home'>
    <BalanceCard/>
    <OperationsTable/>
    </div>
  </>
  );
}

export default Home