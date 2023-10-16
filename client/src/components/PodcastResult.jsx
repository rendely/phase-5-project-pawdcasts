import { useState } from 'react'
import './PodcastResults.css'

export default function PodcastResult({ podcast }) {
  const [isFollowed, setIsFollowed] = useState(podcast.followed === undefined ? true : podcast.followed);

  function handleFollow(){
    fetch('/api/follow', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({id: podcast.id, followed: isFollowed})
    })
    .then(r => r.json())
    .then(d => {console.log(d); setIsFollowed(curr => !curr);})
  }

  return (
    <div className='podcast-result'>
      <img className='podcast-image' src={podcast.image_url} />
      <div className='podcast-data'>
        <div className='podcast-name'>
           <a href={podcast.itunes_url} target="_blank">{podcast.title}</a>
        </div>
        {/* <div>{podcast.genre}</div>
        <div>{podcast.track_count} episodes</div> */}
        
      </div>
      <div className='podcast-follow'>
        <button onClick={handleFollow}>
        {isFollowed ? 'Following' : 'Add' }
        </button>
        </div>
    </div>  
  )
} 