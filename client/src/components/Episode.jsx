import { useState } from 'react';
import './Episode.css'

export default function Episode({ episode }) {

  const [isPlaying, setIsPlaying] = useState(false);
  const date = new Date(episode.date);
  const formattedDate = date.toLocaleString().slice(0, 9);

  return (
    <div className='episode-result'>
      <div className='episode-left'>


        <div className='episode-podcast-title'>
          {episode.podcast_title}
        </div>
        <div className='episode-title'>
          {episode.title}
        </div>
        <div className='episode-date'>
          {formattedDate}
        </div>
        <div className='episode-audio'>
          {isPlaying ?
            <audio controls autoPlay title={episode.title}>
              <source src={episode.mp3} type="audio/mpeg" />
            </audio>
            :
            null
          }
        </div>
      </div>
      <div className='episode-play-toggle'>
        <button onClick={() => setIsPlaying(curr => !curr)}>{isPlaying ? 'Stop' : 'Play'}</button>
      </div>
    </div>
  )
} 