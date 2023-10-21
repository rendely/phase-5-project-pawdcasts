import List from "../components/List";
import ListItem from "../components/ListItem";
import Episode from "../components/Episode";
import { useEffect, useState } from "react";
import {useParams} from "react-router-dom";

export default function Feed() {
  const params = useParams();
  const [podcast, setPodcast] = useState({title: 'Loading...'});
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    fetch(`/api/podcast/${params['id']}`)
    .then(r => r.json())
    .then(d => {
        setEpisodes(d['episodes']);
        setPodcast(d['podcast']);
    })

  },[]);

  return (
    <>
      <h2>{podcast['title']}</h2>
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