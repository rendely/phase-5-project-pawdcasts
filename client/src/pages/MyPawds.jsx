import List from "../components/List";
import ListItem from "../components/ListItem";
import PodcastResult from "../components/PodcastResult"
import { UserContext } from "../UserContext";
import { useContext, useState } from "react";

export function MyPawds() {

  const {user} = useContext(UserContext);

  const [followedPodcasts, setFollowedPodcasts] = useState(user.followed_podcasts);

  return (
    <>
      <h2>My Pawds</h2>
      <List>
      {followedPodcasts.map(p =>
          <ListItem key={p.id}>
            <PodcastResult podcast={p} />
          </ListItem>
        )}
      </List>
    </>
  )
}