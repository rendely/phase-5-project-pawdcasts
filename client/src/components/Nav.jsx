import './Nav.css';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import useEmoji from './useEmoji';
import pawdLogo from '/pawdcast_logo_large.png';
import { UserContext } from "../UserContext";

export function Nav() {

  const { currentAudio, setCurrentAudio } = useContext(UserContext);

  if (window.innerWidth >= 425) useEmoji();

  return (
    <>
      <div className='spacer'></div>
      <div className='bottom-bar'>
        {currentAudio ? <div className='player'>
          <div className='audio'><audio controls autoPlay >
            <source src={currentAudio} type="audio/mpeg" />
          </audio></div>
          <div>
          <button onClick={()=> setCurrentAudio(null)}>close</button></div>
        </div> : null}
        <div className='nav-bar'>
          <NavLink className='nav-link' to='/'>Feed</NavLink>
          <NavLink className='nav-link' to='/search'>Search</NavLink>
          <NavLink className='nav-link' to='/me'>My Pawds</NavLink>
          <NavLink to='/login'> <img src={pawdLogo} className="logo" alt="Pawdcasts logo" /></NavLink>
        </div>
      </div>
    </>)
}