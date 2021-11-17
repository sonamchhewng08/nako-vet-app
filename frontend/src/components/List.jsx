import react,{useState,useContext,useEffect} from 'react'
import '../css/list.css'
import axios from 'axios'
import IconButton from '@mui/material/IconButton';
import EditTwoTone from '@mui/icons-material/EditTwoTone';
import DeleteIcon from '@mui/icons-material/Delete';
import {AuthContext} from '../contextApi/authContext'
import { NavLink } from 'react-router-dom';
const List=(props)=>{
    const [data, setdata] = useState();
    const [isempty, setisempty] = useState(true);
    const {user}=useContext(AuthContext);
    const getData=async()=>{
        try {
            const res= await axios.get('/data/alldata',{
                headers:{authorization:"Bearer "+user.token}
            });
            setdata(res.data);
        } catch (error) {
            console.log(error);
        }
    }
    const handleDelete=async(id)=>{
        try {
            const res= await axios.delete(`/data/delete/${id}`,{
                headers:{authorization:"Bearer "+user.token}
            });
            setdata((prev)=>{
                return prev.filter((arr,ind)=>{return arr._id!==id})
            })
        } catch (error) {
            console.log(error);
        }
    }
    const handleUpdate=(val)=>{
        props.data(val)
        props.update(true);
    }
    useEffect(() => {
        getData();
    }, [])
    useEffect(() => {
        if(data && data.length>0){
            setisempty(false);
        }else setisempty(true);
    }, [data])
    return(
        <>
            <div className="list">
                <table>
                    {!isempty?
                        <>
                        <thead>
                        <th>Tag Number</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>village</th>
                        <th>Operation</th>
                            </thead>
                            <tbody>
                            { data.map((value,index)=>{
                                return(
                                    <tr key={index}>
                                        <td>{value._id}</td>
                                        <td>{value.Name}</td>
                                        <td>{value.Phone}</td>
                                        <td>{value.Village}</td>
                                        <td className="op">
                                        <IconButton className="btn"  aria-label="delete" >
                                            <DeleteIcon className="delete-icon"  onClick={()=>{handleDelete(value._id)}}/>
                                        </IconButton>
                                        <IconButton className="btn" aria-label="delete">
                                            <NavLink to="/update"><EditTwoTone className="update-icon" onClick={()=>{handleUpdate(value)}} /></NavLink>
                                        </IconButton></td>
                                    </tr>)
                                })
                            } 
                        </tbody>
                        </>:
                        <p>No data found</p>
                    }
                    
                </table>

            </div>
        </>
    ) 
}
export default List