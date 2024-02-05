import React,{useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../assets/logo.png'
import search from '../../assets/search-solid.svg'
import Avatar from '../../components/Avatar/Avatar'
import './Navbar.css'
import {useDispatch,useSelector} from 'react-redux';
import { setCurrentUser } from '../../actions/currentUser'
import {jwtDecode} from "jwt-decode"
const Navbar = () => {

    var User=useSelector((state)=>(state.currentUserReducer))
    
    
    const dispatch=useDispatch()
    
    useEffect(()=>{
      const token=User?.token
      if(token){
        const decodedToken=jwtDecode(token)
        if(decodedToken.exp*1000<new Date().getTime()){
          handleLogout()
        }
      }
      dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))
    },[User?.token,dispatch])
    
    const navigate=useNavigate()

    const handleLogout=()=>{
      dispatch({type:"LOGOUT"})
      navigate("/")

      dispatch(setCurrentUser(null))
      
    }

    return (
    <nav className='main-nav'>
      <div className='navbar'>
        <Link to="/" className='nav-item nav-logo'>
            <img src={logo} alt='logo'></img>
        </Link>
        <Link to='/' className='nav-item nav-btn'>About</Link>
        <Link to='/' className='nav-item nav-btn'>Products</Link>
        <Link to='/' className='nav-item nav-btn'>For Teams</Link>
        <form>
            <input type='text' placeholder='Search....'/>
            <img src={search} alt='search' width={18} className='search-icon'/>
        </form>

      {/* if user is loin or not */}
        {User===null?
            <Link to='/Auth' className='nav-items nav-links'>Log in</Link>
            :<>
                <Link to='/Users' className=''>
                <Avatar backgroundColor='skyblue' px='10px' py="7px" borderRadius="50%" color="white" textDecoration="none">
                  <Link to={`/Users/${User?.result?._id}`} style={{color:"white",textDecoration:"none"}}>{User.result.name.charAt(0).toUpperCase()}</Link>
                </Avatar>
                
                </Link>
                <button className="nav-item nav-links" onClick={handleLogout}>Log Out</button>
            </>
        }
      </div>
    </nav>
  )
}
export default Navbar
