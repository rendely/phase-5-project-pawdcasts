import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import List from "../components/List";
import { PodcastResultType } from "../types";
import PodcastResult from "../components/PodcastResult";
import ListItem from "../components/ListItem";

export default function Search() {

  const [results, setResults] = useState<PodcastResultType[]>([])

  useEffect(() => {
    fetch('/api/search?q=Sam+Harris')
    .then(r => r.json())
    .then(d => setResults(d))
  },[]);

  return (
    <>
      <SearchBar />
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