import List from "../components/List";
import ListItem from "../components/ListItem";
import Episode from "../components/Episode";
import { UserContext } from "../UserContext";
import { useContext, useEffect, useState } from "react";

export default function Feed() {
  const context = useContext(UserContext);
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    fetch('/api/feed')
    .then(r => r.json())
    .then(d => setEpisodes(d))

  },[]);

  console.log(episodes);

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