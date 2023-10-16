import './Episode.css'

export default function Episode({ episode }) {

  return (
    <div className='episode-result'>
      <div className='episode-podcast-title'>
        {episode.podcast_title}
      </div>
      <div className='episode-title'>
        {episode.title}
      </div>
      <div style={{ display: 'flex', 'flexFlow': 'row', 'justifyContent': 'space-between' }}>
        <audio controls title={episode.title}>
          <source src={episode.mp3} type="audio/mpeg" />
        </audio>
      </div>
    </div>
  )
} 