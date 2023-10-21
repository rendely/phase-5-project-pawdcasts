import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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

    console.log(episode);
    if (!episode) return <h2>Loading...</h2>

    return (
        <>
            <h3>
                {episode.podcast.title}
            </h3>
            <h2>
                {episode.title}
            </h2>
            <div>
                {episode.description}
            </div>
            <div>
                <audio controls autoPlay title={episode.title}>
                    <source src={episode.source_url} type="audio/mpeg" />
                </audio>
            </div>
        </>
    )
}