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
            <source src="https://anchor.fm/s/4fc82b80/podcast/play/27903967/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2021-03-04%2Fbddcb1ed632791f3c64c7138c92b3480.m4a" type="audio/mpeg" />
          </audio>
        </ListItem>
      </List>

    </>
  )
}