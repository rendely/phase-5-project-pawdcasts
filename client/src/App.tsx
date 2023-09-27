import ReactDOM from 'react-dom/client'
import { useEffect } from 'react'
import pawdLogo from '/pawdcast_logo_large.png'
import './App.css'
import {Emoji} from './Emoji';

function App() {
  useEffect(() => {
    const createEmoji = () => {
      const emojiEl = document.createElement('div');
      document.body.appendChild(emojiEl);
      const randomLeft = Math.random() * window.innerWidth;
      emojiEl.style.setProperty('left',  `${randomLeft}px`);
      emojiEl.style.setProperty('bottom',  '0');
      emojiEl.style.setProperty('position', 'absolute');
      emojiEl.style.setProperty('z-index', '-3');
      console.log(emojiEl.style.left);
      const root = ReactDOM.createRoot(emojiEl);
      root.render(<Emoji />);
      

      setTimeout(() => {
        root.unmount(); 
        document.body.removeChild(emojiEl);
      }, 2000); // Remove after 5 seconds, which matches our animation duration
    };

    const interval = setInterval(createEmoji, 200); // Create an emoji every second

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={pawdLogo} className="logo" alt="React logo" />
        </a>
      </div>
      <h1>Pawd🐾casts</h1>
      
    </>
  )
}

export default App
