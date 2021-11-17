import React,{useState,useContext} from 'react'
import './css/App.css'
import Header from './components/Header'
import Input from './components/Input'
import Login from './components/Login'
import Main from './components/Main'
import List from './components/List'
import Update from './components/Update'
import Footer from './components/Footer'
import {BrowserRouter as Router,Switch,Redirect,Route} from 'react-router-dom'
import { AuthContext } from './contextApi/authContext'
const App = () => {
  const {user}= useContext(AuthContext);
  const [update_data, setupdate_data] = useState();
  const [check,setcheck]=useState(true);
  const data=(val)=>{
    setupdate_data(val);
  }
  const update=(val)=>{
    setcheck(val);
  }
  return (
    <Router>  
    <div className="app">
      <Header user={user}/>
        <Switch>
          <Route exact path="/">
              <Main data={data} update={update} user={user}/>
          </Route>
          <Route exact path="/add">
              {user?<Input/>:<Redirect to="/"/>}
          </Route>
          <Route exact path='/login'>
            {user?<Redirect to="/"/>:<Login/>}
          </Route>
          <Route exact path='/viewAll'>
            {user?<List data={data} update={update}/>:<Redirect to="/"/>}
          </Route>
          <Route exact path="/update">
            {(user&&check)?<Update data={update_data} update={update}/>:<Redirect to="/"/>}
          </Route>
        </Switch>
        <Footer/>
    </div>
    </Router>
  )
}

export default App
