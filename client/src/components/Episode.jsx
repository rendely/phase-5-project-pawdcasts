import { useState, useRef} from 'react';
import {NavLink} from 'react-router-dom';
import './Episode.css'

export default function Episode({ episode }) {

  const [isPlaying, setIsPlaying] = useState(false);
  const audio = useRef();
  
  // console.log(audio.current.currentTime);

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
          {episode.title}
        </div>
        <div className='episode-date'>
          {episode.publish_date}
        </div>
        
      </div>
      <div className='episode-play-toggle'>
        <button onClick={() => setIsPlaying(curr => !curr)}>{isPlaying ? 'Stop' : 'Play'}</button>
      </div>
      
    </div>
    <div className='episode-description'>
    {episode.description.slice(0,200)}
  </div>
  <div className='episode-audio'>
    {isPlaying ?
      <audio ref={audio} controls autoPlay title={episode.title}>
        <source src={episode.source_url} type="audio/mpeg" />
      </audio>
      :
      null
    }
  </div>
  </div>
  )
} 