import List from "../components/List";
import ListItem from "../components/ListItem";


export default function Feed() {

  return (
    <>
      <h2>Latest episodes</h2>
      <List>
        <ListItem>
          <audio controls>
            <source src="https://traffic.libsyn.com/secure/wakingup/Making_Sense_335_Covid.mp3?dest-id=480596" type="audio/mpeg" />
          </audio>
        </ListItem>
        <ListItem>
          <audio controls>
            <source src="https://traffic.libsyn.com/secure/wakingup/Making_Sense_335_Covid.mp3?dest-id=480596" type="audio/mpeg" />
          </audio>
        </ListItem>
      </List>

    </>
  )
}