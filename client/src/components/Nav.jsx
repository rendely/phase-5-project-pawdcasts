import './Nav.css'
import { NavLink } from 'react-router-dom'

export function Nav() {

  return (<div className='nav-bar'>
    <NavLink className='nav-link' to='/'>Feed</NavLink>
    <NavLink className='nav-link' to='/search'>Search</NavLink>
    <NavLink className='nav-link' to='/me'>My Pawds</NavLink>
  </div>)
}