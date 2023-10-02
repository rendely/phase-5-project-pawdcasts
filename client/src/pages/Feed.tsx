import List from "../components/List";
import ListItem from "../components/ListItem";


export default function Feed() {

  return (
    <>
      <h2>Latest episodes</h2>
      <List>
        <ListItem>
          <div style={{ display: 'flex', 'flexFlow': 'row', 'justifyContent': 'space-between' }}>
            <audio controls>
              <source src="https://traffic.libsyn.com/secure/wakingup/Making_Sense_335_Covid.mp3?dest-id=480596" type="audio/mpeg" />
            </audio>
          </div>
        </ListItem>
        <ListItem>
        <div style={{ display: 'flex', 'flexFlow': 'row', 'justifyContent': 'space-between' }}>
          <video controls poster="/pawdcast_logo_large.png" width="300" height="300">
            <source src="https://traffic.libsyn.com/secure/wakingup/Making_Sense_335_Covid.mp3?dest-id=480596" type="audio/mpeg" />
            Your browser does not support the audio element.
          </video>
          </div>
        </ListItem>
      </List>

    </>
  )
}