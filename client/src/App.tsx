import pawdLogo from '/pawdcast_logo_large.png'
import './App.css'
import useEmoji from './useEmoji';

function App() {
  useEmoji()

  return (
    <>
      <div>
        <img src={pawdLogo} className="logo" alt="React logo" />
      </div>
      <h1>Pawd🐾casts</h1>
    </>
  )
}

export default App
