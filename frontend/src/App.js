import './App.css';
//IMPORTS
import 'antd/dist/antd.css';
import { BrowserRouter as Router} from 'react-router-dom';
import {Routes, Route} from 'react-router-dom';

// PAGES
import Home from './Pages/Home/Home';
import Operations from './Pages/Operations/Operations';
import Start from './Pages/Start/Start';

//COMPONENTS
import Navbar from './Components/Layout/Header';
import RequireAuth from './auth/RequireAuth';


function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route exact path= '/' element={<Start/>}/>
          <Route element={<RequireAuth/>}> 
            <Route element={<Navbar/>}>
              <Route path='/home' element={<Home/>}/>
              <Route path='/operations' element={<Operations/>}/>
            </Route>
          </Route>
        </Routes>  
    </Router>
      
        
    </div>
  );
}

export default App;
