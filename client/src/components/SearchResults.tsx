import PodcastResult from './PodcastResult'
import './SearchResults.css'
import { PodcastResultType } from '../types';

interface SearchResultsProps {
  results: PodcastResultType[];
}

export default function SearchBar( {results}:SearchResultsProps) {

  return (
    <div className='search-results'>
      {results.map(p => 
       <PodcastResult key={p.id} podcast={p}/>
      )}
    </div>
  )
} 