import List from "../components/List";
import ListItem from "../components/ListItem";
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
            {episode.title}
          <div style={{ display: 'flex', 'flexFlow': 'row', 'justifyContent': 'space-between' }}>
            <audio controls title={episode.title}>
              <source src={episode.mp3} type="audio/mpeg" />
            </audio>
          </div>
        </ListItem>
          )}        
      </List>

    </>
  )
}