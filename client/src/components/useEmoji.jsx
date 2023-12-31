import { useEffect } from 'react';
import ReactDOM from 'react-dom/client'
import './Emoji.css';

export default function useEmoji() {
  useEffect(() => {
    const createEmoji = () => {
      const emojiEl = document.createElement('div');
      document.body.appendChild(emojiEl);
      const randomLeft = Math.random() * window.innerWidth;
      emojiEl.style.setProperty('left',  `${randomLeft}px`);
      const randomBottom = 0.5 + Math.random() *0.5 * window.innerHeight;
      emojiEl.style.setProperty('bottom',  `${randomBottom}px`);
      emojiEl.style.setProperty('position', 'fixed');
      const randomFont = Math.random() * 4;
      emojiEl.style.setProperty('font-size', `${randomFont}4em`);
      emojiEl.style.setProperty('z-index', '-3');
      const root = ReactDOM.createRoot(emojiEl);
      root.render(<div className="emoji">🎶</div>);
      

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

  return;
}