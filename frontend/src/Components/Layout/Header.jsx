import React from 'react'
//COMPONENTS
import useAuth from "../../hooks/useAuth";
import './Header.css'
//COMPONENTS
import LogoutModal from '../LogoutModal/LogoutModal';
//ANTD
import {Layout, Menu} from 'antd';
import {Link, Outlet } from 'react-router-dom'
import 'antd/dist/antd.css';
const { Header, Content, Footer } = Layout;



export const Navbar = () => {
  const { auth } = useAuth();
  return (
    <Layout className="layout">
    <Header style={{ position: 'fixed', zIndex: 1, width: '100%'}}>
      <div className="logo-container">
        <Link to='/home'><img src="/logo.png" alt="logo" className='logo'/></Link>
      </div>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" >
              <Link to='/home'>Home</Link>
          </Menu.Item>
          <Menu.Item key="2" >
              <Link to='/operations'>Operations</Link>
          </Menu.Item>
      </Menu>

    </Header>
    <Content style={{ padding: '50px 50px' }}>
      <div className="site-layout-content">
        <Outlet/>
      </div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>
      {auth.email}
      <br/>
      <LogoutModal/>
      </Footer>
  </Layout>
  )
}

export default Navbar