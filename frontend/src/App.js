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



function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
        <Route exact path= '/start' element={<Start/>}/>
          <Route path='/' element={<Navbar/>}>
            <Route path='/home' element={<Home/>}/>
            <Route path='/operations' element={<Operations/>}/>
          </Route>
        </Routes>  
    </Router>
      
        
    </div>
  );
}

export default App;
