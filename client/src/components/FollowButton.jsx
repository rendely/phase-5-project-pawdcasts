import { useState } from 'react';

export default function FollowButton( {id, followed}){

    const [isFollowed, setIsFollowed] = useState(followed === undefined ? true : followed);

    function handleFollow(){
        fetch('/api/follow', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({id: id, followed: isFollowed})
        })
        .then(r => r.json())
        .then(d => {console.log(d); setIsFollowed(curr => !curr);})
      }

      return (
      <div className='podcast-follow'>
        <button onClick={handleFollow}>
          {isFollowed ? 'Following' : 'Add'}
        </button>
      </div>
      )
}

