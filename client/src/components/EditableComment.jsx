import {useState} from 'react';

export default function EditableComment( {comment, editable} ){

    const [text, setText] = useState(comment.text);

    function handleChange(e){
        setText(e.target.value);
        fetch(`/api/comment/${comment.id}`, {
            method: 'PATCH',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({text: e.target.value})
        });
        

    }
    if (!editable) return <div>{text}</div>
    return <input onChange={handleChange} value={text} />
}