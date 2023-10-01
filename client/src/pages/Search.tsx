import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import List from "../components/List";
import { PodcastResultType } from "../types";
import PodcastResult from "../components/PodcastResult";
import ListItem from "../components/ListItem";

export default function Search() {

  const [results, setResults] = useState<PodcastResultType[]>([])

  return (
    <>
      <SearchBar setResults={setResults}/>
      <List>
        {results.map(p =>
          <ListItem key={p.id}>
            <PodcastResult podcast={p} />
          </ListItem>
        )}
      </List>
    </>
  )
}