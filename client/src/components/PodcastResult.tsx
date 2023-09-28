import './PodcastResults.css'
import { PodcastResultType } from '../types';

interface PodcastResultProps {
  podcast: PodcastResultType;
}

export default function PodcastResult({podcast}: PodcastResultProps) {

  return (
       <div className='podcast-result'>{podcast.name}</div>
  )
}