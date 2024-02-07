import './List.css'

export default function List( {children}) {

  return (
    <div className='list-container animate'>
      {children}
    </div>
  )
} 