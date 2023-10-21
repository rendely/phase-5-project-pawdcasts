import List from "../components/List";
import ListItem from "../components/ListItem";
import PodcastResult from "../components/PodcastResult"
import { UserContext } from "../UserContext";
import { useContext, useEffect } from "react";

export function MyPawds() {

  const {user, updateUser} = useContext(UserContext);

  const followedPodcasts= user.followed_podcasts;

  useEffect(() => updateUser(), []);

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