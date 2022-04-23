import React from 'react'
import './Header.css'
//ANTD
import { Layout, Menu} from 'antd';
import {Link, Outlet, } from 'react-router-dom'
import 'antd/dist/antd.css';
const { Header, Content, Footer } = Layout;
//COMPONENT 'Header'
export const Navbar = () => {
  return (
    <Layout className="layout">
    <Header>
      <div className="logo-container">
        <Link to='/home'><img src="/logo.png" alt="logo" className='logo'/></Link>
      </div>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
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
    <Footer style={{ textAlign: 'center' }}>Santiago Sanchez Nieva</Footer>
  </Layout>
  )
}

export default Navbar