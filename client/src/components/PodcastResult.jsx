
import { NavLink } from 'react-router-dom';
import './PodcastResults.css'
import FollowButton from './FollowButton';

export default function PodcastResult({ podcast }) {
  
  return (
    <div className='podcast-result'>
      <img className='podcast-image' src={podcast.image_url} />
      <div className='podcast-data'>
        <div className='podcast-name'>
          {!podcast.feed_url ? <div className='error'>Error no feed url</div> : null}
          <NavLink to={`/podcast/${podcast.id}`}>{podcast.title}</NavLink>
        </div>
      </div>
        <FollowButton followed={podcast.followed} id={podcast.id} />      
    </div>
  )
} 