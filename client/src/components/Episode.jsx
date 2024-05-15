import { NavLink } from 'react-router-dom';
import './Episode.css'

export default function Episode({ episode }) {


  return (
    <div>
      <div className='episode-result'>
        <div className='episode-podcast-image'>
          <img src={episode.podcast.image_url} />
        </div>
        <div className='episode-left'>


          <div className='episode-podcast-title'>
            <NavLink to={`/podcast/${episode.podcast.id}`}>{episode.podcast.title}</NavLink>
          </div>
          <div className='episode-title'>
            <NavLink to={`/episode/${episode.id}`}>{episode.title}</NavLink>
          </div>
          <div className='episode-date'>
            {episode.publish_date}
          </div>

        </div>


      </div>
      
    </div>
  )
} 