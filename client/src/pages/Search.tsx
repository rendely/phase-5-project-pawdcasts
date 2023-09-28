import { useState } from "react";
import SearchBar from "../components/SearchBar";
import SearchResults from "../components/SearchResults";
import { PodcastResultType } from "../types";

export default function Search() {

  const [results, setResults] = useState<PodcastResultType[]>([{'id': 1,'name': 'Hiii'},{'id': 2,'name': 'yooo'}])

  return (
    <>
      <SearchBar />
      <SearchResults results={results}/>
    </>
  )
}