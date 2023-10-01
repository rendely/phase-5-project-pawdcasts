import './PodcastResults.css'
import { PodcastResultType } from '../types';

interface PodcastResultProps {
  podcast: PodcastResultType;
}

export default function PodcastResult({ podcast }: PodcastResultProps) {

  return (
    <div className='podcast-result'>
      <img className='podcast-image' src={podcast.image} />
      <div className='podcast-name'>
        {podcast.name} - <a href={podcast.itunes_url} target="_blank">View on iTunes</a>

        </div>
    </div>
  )
}