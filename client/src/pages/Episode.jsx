import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Comments from "../components/Comments";
import './Episode.css'

export default function Episode() {
    const params = useParams();
    const [episode, setEpisode] = useState();
    const audio = useRef();
    const timeoutIdRef = useRef(null);

    function saveCurrentTime(){
        if (audio.current) {
            const currentTime = Math.round(audio.current.currentTime);
            fetch (`/api/episode/${params['id']}`, {
                method: 'PATCH',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({current_time: currentTime})                
            });

        }
        timeoutIdRef.current = setTimeout(saveCurrentTime, 10000);
    }

    useEffect(() => {
        fetch(`/api/episode/${params['id']}`)
            .then(r => r.json())
            .then(d => {
                setEpisode(d);    
                saveCurrentTime();            
            });
        
        return () => {
            if (timeoutIdRef.current) {
                clearTimeout(timeoutIdRef.current);
            }
        };

    }, []);

    useEffect(() => {
        if (audio.current) audio.current.currentTime = episode.current_time}
    ,[episode]);

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
                <audio ref={audio} controls autoPlay title={episode.title}>
                    <source src={episode.source_url} type="audio/mpeg" />
                </audio>
            </div>
            <Comments episode_id={episode.id}/>
        </div>
    )
}