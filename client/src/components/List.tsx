import './List.css'

interface ListProps {
  children: React.ReactNode;
}

export default function List( {children} : ListProps) {

  return (
    <div className='list-container'>
      {children}
    </div>
  )
} 