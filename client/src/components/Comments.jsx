import './Comments.css'
import {useState, useEffect} from 'react';

export  default function Comments( {episode_id} ){

    const [comments, setComments] = useState([]);

    useEffect(() => {
        fetch(`/api/comment/episode/${episode_id}`)
        .then(r => r.json())
        .then(d => setComments(d))
    },[])

    function handleSubmit(){
        fetch(`/api/comment/episode/${episode_id}`, {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({text:'yoyo'})
        })
        .then(r => r.json())
        .then(d => setComments(curr => [...curr, d]))
    }

    function handleDelete(id){
        fetch(`/api/comment/${id}`, {method: 'DELETE'})
        .then(r => {if (r.status===204){
             setComments(curr => curr.filter(comment => comment.id !== id))
        }})

    }

    return (
    <div className='comments-container'>
        <h3> Comments</h3>
        <div className='new-comment'>
            <form>
                <input type='text' />
            </form>
            <button onClick={handleSubmit}>Add comment</button>
            </div>
        <div className='comment-list'>
            {comments.map(comment => 
            <div key={comment.id} className='comment'>
                {comment.user.name}: 
                {comment.text}
            <button onClick={() => handleDelete(comment.id)}>Delete</button>
            </div>                
                )}
        </div>
    </div>
)}