import React from 'react'

//CSS
import './Home.css'
//COMPONENTS
import BalanceCard from '../../Components/BalanceCard/BalanceCard';
import OperationsTable from '../../Components/OperationsTable/OperationsTable';
import useAuth from "../../hooks/useAuth";

//PAGE 'Home'
const Home = () => {
  const { auth } = useAuth();

  return (
  <>
    <div className='Home'>
    <h1>Welcome, {auth.username}</h1>
    <BalanceCard/>
    <OperationsTable/>
    </div>
  </>
  );
}

export default Home