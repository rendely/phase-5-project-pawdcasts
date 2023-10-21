import './Nav.css'
import { NavLink } from 'react-router-dom'
import useEmoji from './useEmoji';
import pawdLogo from '/pawdcast_logo_large.png'

export function Nav() {
  useEmoji()

  return (<div className='nav-bar'>
    <NavLink className='nav-link' to='/'>Feed</NavLink>
    <NavLink className='nav-link' to='/search'>Search</NavLink>
    <NavLink className='nav-link' to='/me'>My Pawds</NavLink>
    <img src={pawdLogo} className="logo" alt="Pawdcasts logo" />
  </div>)
}