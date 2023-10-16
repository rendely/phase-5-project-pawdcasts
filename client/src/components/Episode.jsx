import { useState } from 'react';
import './Episode.css'

export default function Episode({ episode }) {

  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className='episode-result'>
      <div className='episode-podcast-title'>
        {episode.podcast_title}
      </div>
      <div className='episode-title'>
        {episode.title}
      </div>
      <div className='episode-audio'>
        {isPlaying ?
          <audio controls title={episode.title}>
            <source src={episode.mp3} type="audio/mpeg" />
          </audio>
          :
          null
        }
      </div>
      <div className='episode-play-toggle'>
        <button onClick={() => setIsPlaying(curr => !curr)}>{isPlaying ? 'Hide' : 'Play'}</button>
      </div>
    </div>
  )
} 