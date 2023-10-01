import './Nav.css'
import { NavLink } from 'react-router-dom'

export function Nav(){

  return (<div className='nav-bar'>
    <NavLink className='nav-link' to='/'>Home</NavLink>
    <NavLink className='nav-link' to='/feed'>Feed</NavLink>
    <NavLink className='nav-link' to='/search'>Search</NavLink>
  </div>)
}