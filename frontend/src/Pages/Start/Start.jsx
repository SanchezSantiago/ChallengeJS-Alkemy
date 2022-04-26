import React from 'react'
import './Start.css'
import Login from '../../Components/Login/Login';
import RegisterForm from '../../Components/RegisterForm/RegisterForm'

const Start = () => {
  return (

    <div className='container'>
        <div className='welcome'>
            <img src="/logo.png" alt="logo" className='logo'/>
            <div className='buttons-container'>
                <Login/>
                <RegisterForm/>
            </div>

        </div>
    </div>

  )
}

export default Start