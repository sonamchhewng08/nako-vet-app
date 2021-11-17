import React,{useContext, useState} from 'react'
import '../css/input.css'
import axios from 'axios';
import {AuthContext} from '../contextApi/authContext'
import CircularProgress from '@mui/material/CircularProgress';
const Update = ({data,update}) => {
    const {user}=useContext(AuthContext);
    const [msg, setmsg] = useState("");
    const [res, setres] = useState(false);
    const [input, setinput] = useState(data);
    const [isFetching,setisFetching]=useState(false);
    const handleChange=(e)=>{
        const{name,value}=e.target;
        setinput((prev)=>{
            return {...prev,[name]:value}
        })
    }
    const addid=(e)=>{
        setinput((prev)=>{
            return {...prev,'_id':e.target.value};
        })
    }
    const submit=async(e)=>{
        e.preventDefault();
        try {
            setisFetching(true);
            const res=await axios.put(`/data/update/${input._id}`,input,{
                headers:{authorization:"Bearer "+user.token}
            });
            if(res){
                setmsg("data Updated!")
                setisFetching(false);
                setres(true);
                update(false);
            }
        } catch (error) { 
            setmsg("Something went wrong!");
            setisFetching(false);
            setres(false);
            console.log(error);
        }
    }
    return (
        <div className="Input">
            <form onSubmit={submit}>
                <input onChange={addid} required value={input._id} type="text" name="Tag_Number" placeholder="Tag Number" />
                <input onChange={handleChange} value={input.Name} required type="text" name="Name" placeholder="Enter Name" />
                <input onChange={handleChange} value={input.Phone} required type="Number" name="Phone" placeholder="Enter phone number" />
                <div className="Input_village">
                <label htmlFor="cars">Choose a Village:</label>
                    <select onChange={handleChange} value={input.Village} name="Village" >
                        <option value="nako">Nako</option>
                        <option value="Malling">Malling</option>
                    </select>
                </div>
                {isFetching?<CircularProgress color="success" />:<input  type="submit" className="Input_btn" value="Update"/>}
                {res?<p className="msg success">{msg}</p>:<p className="msg error">{msg}</p>}
            </form>
        </div>
    )
}

export default Update
