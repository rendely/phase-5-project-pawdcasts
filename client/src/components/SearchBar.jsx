import { useState } from 'react';
import './SearchBar.css';


export default function SearchBar({ setResults }) {
  const [keyword, setKeyword] = useState('');


  function handleSearch(e){
    e.preventDefault();
    fetch('/api/search?q='+keyword)
    .then(r => r.json())
    .then(d => setResults(d))
  }

  return (
    <div className='search-bar'>
      <h2>Find podcasts</h2>
      <form onSubmit={handleSearch} action=''>
        <input
          autoFocus
          className='search-bar-input'
          type='search'
          placeholder='Search'
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)} />
      </form>
    </div>
  )
}