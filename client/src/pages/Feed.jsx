import List from "../components/List";
import ListItem from "../components/ListItem";
import Episode from "../components/Episode";
import { useEffect, useState } from "react";

export default function Feed() {
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    fetch('/api/feed')
    .then(r => r.json())
    .then(d => setEpisodes(d))

  },[]);

  return (
    <>
      <h2>Latest episodes</h2>
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