import React, { useContext, useState,useEffect } from 'react'
import '../css/login.css'
import { AuthContext } from '../contextApi/authContext'
import {login} from '../contextApi/apicalls';
import CircularProgress from '@mui/material/CircularProgress';
const Login = () => {
    const [data,setdata]=useState({
        username:"",
        password:""
    })
    const [isFeatch, setisFeatch] = useState(false);
    const {isFeatching,dispatch,error}=useContext(AuthContext);
    const handleChange=(e)=>{
        const {name,value}=e.target;
        setdata((prev)=>{
            return {...prev,[name]:value}
        })
    }
    useEffect(() => {
      setisFeatch(false);
    }, [error])
    const onlogin=(e)=>{
        setisFeatch(true);
        e.preventDefault();
       login(data,dispatch);
    }
    return (
        <>
        <h1>log in</h1>
        <div className="login">
            <input required  type="text" onChange={handleChange} name="username" placeholder="Enter username"/>
            <input  required type="password" onChange={handleChange} name="password" placeholder="Enter password"/>
            {isFeatch?<CircularProgress color="success" />:<input className="login_btn" onClick={onlogin} type="submit" value="Submit" />}
            {error?<p>Invalid username or password</p>:""}
        </div>
        </>
    )
}

export default Login
