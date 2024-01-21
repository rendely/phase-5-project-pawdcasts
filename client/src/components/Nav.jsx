import './Nav.css';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import useEmoji from './useEmoji';
import pawdLogo from '/pawdcast_logo_large.png';
import Player from './Player';
import { UserContext } from "../UserContext";

export function Nav() {

  if (window.innerWidth >= 425) useEmoji();

  const { currentEpisode, setCurrentEpisode } = useContext(UserContext);

  return (
    <>
      <div className='spacer'></div>
      <div className='bottom-bar'>
        {currentEpisode ? <div className='player'>
          <div className='audio'>
            <Player currentEpisode={currentEpisode} />
          </div>
          <div>
            <button onClick={() => setCurrentEpisode(null)}>Stop</button></div>
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