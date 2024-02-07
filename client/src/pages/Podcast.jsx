import List from "../components/List";
import ListItem from "../components/ListItem";
import Episode from "../components/Episode";
import { useContext, useEffect, useState } from "react";
import {useParams} from "react-router-dom";
import FollowButton from "../components/FollowButton";
import { UserContext } from "../UserContext";

export default function Podcast() {
  const params = useParams();
  const [podcast, setPodcast] = useState({title: 'Loading...'});
  const [episodes, setEpisodes] = useState();
  const {user, updateUser} = useContext(UserContext);

  const followedPodcasts = user.followed_podcasts;
  const followedPodcastsIds = followedPodcasts.map(p => p.id);
  const isFollowed = followedPodcastsIds.indexOf(parseInt(params['id'])) >= 0;
  
  useEffect(() => {
    fetch(`/api/podcast/${params['id']}`)
    .then(r => {
      if (r.status === 200) return r.json()
      throw new Error('No podcast feed')
    })
    .then(d => {
        setEpisodes(d['episodes']);
        setPodcast(d['podcast']);
    })
    .catch((error) =>{
      setPodcast({title: error.message});
     } )

  },[]);

  if (!episodes) return <h2>Loading...</h2>

  return (
    <>
      <h2>{podcast['title']}</h2>
      <div>
        <FollowButton followed={isFollowed} id={podcast.id}/>
      </div>
      <List>
        {episodes.map(episode => 
          <ListItem key={episode.title}>
           <Episode episode={episode} />
        </ListItem>
          )}        
      </List>
    </>
  )
}