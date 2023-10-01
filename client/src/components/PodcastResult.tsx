import './PodcastResults.css'
import { PodcastResultType } from '../types';

interface PodcastResultProps {
  podcast: PodcastResultType;
}

export default function PodcastResult({ podcast }: PodcastResultProps) {

  console.log(podcast);
  return (
    <div className='podcast-result'>
      <img className='podcast-image' src={podcast.image} />
      <div className='podcast-data'>
        <div className='podcast-name'>
           <a href={podcast.itunes_url} target="_blank">{podcast.name}</a>
        </div>
        <div>{podcast.genre}</div>
        <div>{podcast.track_count} episodes</div>
        
      </div>
      <div className='podcast-follow'>Follow</div>
    </div>
  
  )
} 