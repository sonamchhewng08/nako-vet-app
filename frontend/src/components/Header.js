import React,{useContext} from 'react'
import '../css/header.css'
import Avatar from '@mui/material/Avatar';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../contextApi/authContext';
import { logout } from '../contextApi/authActions';
import { lightGreen } from '@mui/material/colors';
const Header = () => {
    const {user,dispatch}=useContext(AuthContext);
    return (
        <div className='header'>
            <div className="header_left">
            <NavLink activeClassName="active-class" to='/'><h2>Nako</h2></NavLink>
            </div>
            <div className="header_right">
                {user?
                <>
                <NavLink activeClassName="active-class" to='/add'><p>Add</p></NavLink>
                <NavLink  activeClassName="active-class"to ='/viewAll'> <p>view all</p></NavLink>
                    <div className="avatar">
                    <Avatar className="avater-info"
                        alt="Remy Sharp"
                        src=""
                        sx={{ width: 40, height: 40,bgcolor:"lightgreen",color:"black" }}
                    >A</Avatar>
                    <div className="option">
                        <span onClick={()=>dispatch(logout())}>Log out</span>
                    </div>
                    </div>
                </>
                :<NavLink activeClassName="active-class" to="/login"> <button className="login">Log in</button></NavLink>}
                
            </div>
        </div>
    )
}

export default Header
