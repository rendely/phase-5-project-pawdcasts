import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Comments from "../components/Comments";
import './Episode.css'

export default function Feed() {
    const params = useParams();
    const [episode, setEpisode] = useState();

    useEffect(() => {
        fetch(`/api/episode/${params['id']}`)
            .then(r => r.json())
            .then(d => {
                setEpisode(d);
            })

    }, []);

    if (!episode) return <h2>Loading...</h2>

    return (
        <div className='episode-container'>
            <img className="podcast-image" width="100" src={episode.podcast.image_url} />
            <h3>
                {episode.podcast.title}
            </h3>
            <h2>
                {episode.title}
            </h2>
            <div className="description">
                {episode.description}
            </div>
            <div className="audio">
                <audio controls autoPlay title={episode.title}>
                    <source src={episode.source_url} type="audio/mpeg" />
                </audio>
            </div>
            <Comments episode_id={episode.id}/>
        </div>
    )
}