import './Nav.css'
import { NavLink } from 'react-router-dom'
import useEmoji from './useEmoji';
import pawdLogo from '/pawdcast_logo_large.png'

export function Nav() {
  if (window.innerWidth >= 425) useEmoji();

  return (
  <>
  <div className='spacer'></div>
  <div className='nav-bar'>
    <NavLink className='nav-link' to='/'>Feed</NavLink>
    <NavLink className='nav-link' to='/search'>Search</NavLink>
    <NavLink className='nav-link' to='/me'>My Pawds</NavLink>
    <NavLink to='/login'> <img src={pawdLogo} className="logo" alt="Pawdcasts logo" /></NavLink>
  </div>
  </>)
}