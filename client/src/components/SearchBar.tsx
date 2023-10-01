import './SearchBar.css';

export default function SearchBar() {

  return (
    <div className='search-bar'>
      <h2>Find podcasts</h2>
      <input className='search-bar-input' type='text' placeholder='Search'/>
    </div>
  )
}