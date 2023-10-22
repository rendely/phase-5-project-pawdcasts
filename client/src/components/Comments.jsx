import './Comments.css'
import EditableComment from './EditableComment';
import { useContext, useState, useEffect } from 'react';
import { UserContext } from "../UserContext";

export default function Comments({ episode_id }) {

    const { user } = useContext(UserContext);
    const [text, setText] = useState('');

    const [comments, setComments] = useState([]);

    useEffect(() => {
        fetch(`/api/comment/episode/${episode_id}`)
            .then(r => r.json())
            .then(d => setComments(d))
    }, [])

    function handleSubmit(e) {
        e.preventDefault();
        fetch(`/api/comment/episode/${episode_id}`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ text: text })
        })
            .then(r => r.json())
            .then(d => setComments(curr => [...curr, d]))
            .then(() => setText(''))
    }

    function handleDelete(id) {
        fetch(`/api/comment/${id}`, { method: 'DELETE' })
            .then(r => {
                if (r.status === 204) {
                    setComments(curr => curr.filter(comment => comment.id !== id))
                }
            })

    }

    return (
        <div className='comments-container'>
            <h3> Comments</h3>
            <div className='new-comment comment'>
                <div className='comment-author'>Comment as {user.name}:</div>
                <form onSubmit={handleSubmit}>
                    <div className='comment-row'>
                        <input autoFocus onChange={(e) => setText(e.target.value)} type='text' value={text} />
                        <button type='submit' >Comment</button>
                    </div>
                </form>
            </div>
            <div className='comment-list'>
                {comments.map(comment =>
                    <div key={comment.id} className='comment'>
                        <div className='comment-author'>
                            {comment.user.name}
                        </div>
                        <div className='comment-row'>
                            <div className='comment-body'>
                                <EditableComment comment={comment} editable={user.id === comment.user.id} />
                            </div>
                            {comment.user_id === user.id ?
                                <button onClick={() => handleDelete(comment.id)}>Delete</button>
                                : null}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}