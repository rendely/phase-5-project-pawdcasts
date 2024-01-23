import {useContext, useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Comments from "../components/Comments";
import './Episode.css';
import { UserContext } from "../UserContext";


export default function Episode() {
    const { setCurrentEpisode } = useContext(UserContext);
    const params = useParams();
    const [episode, setEpisode] = useState();


    useEffect(() => {
        fetch(`/api/episode/${params['id']}`)
            .then(r => r.json())
            .then(d => {
                setEpisode(d);    
            });
        
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
            <button className='play-button' onClick={() => setCurrentEpisode(episode)}>Play</button>
            <Comments episode_id={episode.id}/>
            <div className="description">
                {episode.description}
            </div>
            
        </div>
    )
}