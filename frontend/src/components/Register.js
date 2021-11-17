import React, { useState } from 'react'
import '../css/login.css'
import axios from 'axios'
const Register = () => {
    const [login,setLogin]=useState({
        username:"",
        password:"",
        cpassword:""
    })
    const [cmsg, setcmsg] = useState("");
    const [validate, setvalidate] = useState(true);
    const handleChange=(e)=>{
        const {name,value}=e.target;
        setLogin((prev)=>{
            return {...prev,[name]:value}
        })
        if(login.password.length>=8 && login.password.length<=12){
            console.log(login.password.length)
            setvalidate(false);
        }
    }
    const onlogin=(e)=>{
        // axios.get('/user/login',login)
        // .then(res=>console.log(res));
        alert("i amd")
    }
    const showmsg=()=>{
        console.log(login.cpassword+" "+login.password)
        if(login.password==(login.cpassword)){
            setcmsg("wewe");
        }else{
            setcmsg("password is not matching");
        }
    }
    const call=(e)=>{
        handleChange(e).then(()=>{
            showmsg();
        })
    }

    return (

        <>
        <h1>Register</h1>
        <div className="login">
            <input type="text" onChange={handleChange} name="username" placeholder="Enter username"/>
            <input type="password" onChange={handleChange} name="password" placeholder="Enter password"/>
            <p className="login_warning">password length should be min-8 max-12 </p>
            <input type="password" onChange={call} name="cpassword" placeholder="Conform password"/>
            <p className="password_warning">{cmsg}</p>
            <input className="login_btn" disabled={validate} onClick={onlogin} type="submit" value="Register"/>
        </div>
        </>
    )
}

export default Register
