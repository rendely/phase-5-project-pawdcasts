import { useState } from 'react';
import './SearchBar.css';

interface SearchBarProps {
  setResults: () => void;
}


export default function SearchBar({ setResults }: SearchBarProps) {
  const [keyword, setKeyword] = useState<string>('');


  function handleSearch(e){
    e.preventDefault();
    fetch('/api/search?q='+keyword)
    .then(r => r.json())
    .then(d => setResults(d))
  }

  return (
    <div className='search-bar'>
      <h2>Find podcasts</h2>
      <form onSubmit={handleSearch}>
        <input
          className='search-bar-input'
          type='text'
          placeholder='Search'
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)} />
      </form>
    </div>
  )
}