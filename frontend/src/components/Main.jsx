import React,{useState,useContext} from 'react'
import '../css/App.css'
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import { AuthContext } from '../contextApi/authContext';
import IconButton from '@mui/material/IconButton';
import EditTwoTone from '@mui/icons-material/EditTwoTone';
import DeleteIcon from '@mui/icons-material/Delete';
import { NavLink } from 'react-router-dom';
const Main = (props) => {
  const {user}=useContext(AuthContext);
    const [data, setdata] = useState(null);
    const [msg, setmsg] = useState("Enter Tag Number")
    const [search, setsearch] = useState("");
    const [isFetch, setisFetch] = useState(false);
    const getData=async()=>{
        setisFetch(true);
      try {
        const res=await axios.get(`/data/search/${search}`);
        if(!res.data){
          setmsg("No Data Found");
        }
        setdata(res.data);
        setisFetch(false);
      } catch (error) {
        setmsg("No Data Found");
        setisFetch(false);
      }
    }
    const handleDelete=async(id)=>{
        try {
            const res= await axios.delete(`/data/delete/${id}`,{
                headers:{authorization:"Bearer "+user.token}
            });
            setdata(null);
        } catch (error) {
            console.log(error);
        }
    }
    const handleUpdate=(val)=>{
        props.data(val)
        props.update(true);
    }
    return (
        <>
        <div className="app_search">
              <h3>Search Tag no</h3>
              <input type="number" onChange={(e)=>setsearch(e.target.value)} value={search} name="tag-number" placeholder="Enter tag number"/>
              {isFetch?<CircularProgress color="success" />: <button  onClick={getData}>Find</button>}
            </div>
            <div className="app_result">
              {data?(
                <table>
                <thead>
                  <th>Tag Number</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>village</th>
                  {
                    user?
                    <th>Operation</th>:""
                  }
                </thead>
                  <tbody> 
                  <tr >
                    <td>{data._id}</td>
                    <td>{data.Name}</td>
                    <td>{data.Phone}</td>
                    <td>{data.Village}</td>
                    {user?
                      <td>
                      <IconButton  aria-label="delete" >
                          <DeleteIcon className="delete-icon"  onClick={()=>{handleDelete(data._id)}}/>
                      </IconButton>
                      <IconButton aria-label="delete">
                          <NavLink to="/update"><EditTwoTone className="update-icon" onClick={()=>{handleUpdate(data)}} /></NavLink>
                      </IconButton>
                      </td>:""
                    }
                </tr>
                </tbody>
            </table>
              ): <p>{msg}</p> }
            </div>
        </>
    )
}

export default Main
