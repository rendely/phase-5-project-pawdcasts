import { useEffect, useRef } from 'react';

export default function Player({ currentEpisode }) {

    const audio = useRef();

    const timeoutIdRef = useRef(null);

    useEffect(() => {
        saveCurrentTime();
        return () => {
            if (timeoutIdRef.current) {
                clearTimeout(timeoutIdRef.current);
            }
        }
    }, [])

    useEffect(() => {
        if (audio.current) audio.current.currentTime = currentEpisode.current_time}
    ,[currentEpisode]);

    function saveCurrentTime() {
        if (audio.current) {
            const currentTime = Math.round(audio.current.currentTime);
            fetch(`/api/episode/${currentEpisode.id}`, {
                method: 'PATCH',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({ current_time: currentTime })
            });

        }
        timeoutIdRef.current = setTimeout(saveCurrentTime, 10000);
    }


    return (
        <>  <div className='audio'>
            <audio
                ref={audio}
                controls autoPlay title={currentEpisode.title}>
                <source src={currentEpisode.source_url} type="audio/mpeg" />
            </audio>
            </div>
        </>)
}