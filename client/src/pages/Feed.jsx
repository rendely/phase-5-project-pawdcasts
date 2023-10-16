import List from "../components/List";
import ListItem from "../components/ListItem";
import { UserContext } from "../UserContext";
import { useContext } from "react";

export default function Feed() {
  const context = useContext(UserContext);

  return (
    <>
      <h2>Latest episodes</h2>
      <List>
        <ListItem>
          <div style={{ display: 'flex', 'flexFlow': 'row', 'justifyContent': 'space-between' }}>
            <audio controls title='Testing title'>
              <source src="https://traffic.libsyn.com/secure/wakingup/Making_Sense_335_Covid.mp3?dest-id=480596" type="audio/mpeg" />
            </audio>
          </div>
        </ListItem>
        <ListItem>
        <div style={{ display: 'flex', 'flexFlow': 'row', 'justifyContent': 'space-between' }}>
          <video controls  poster="/pawdcast_logo_large.png" width="244" height="100" playsInline>
            <source src="https://traffic.libsyn.com/secure/wakingup/Making_Sense_335_Covid.mp3?dest-id=480596" type="audio/mpeg" />
            Your browser does not support the audio element.
          </video>
          </div>
        </ListItem>
      </List>

    </>
  )
}