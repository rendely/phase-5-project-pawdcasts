import './ListItem.css'

interface ListItemProps {
  children: React.ReactNode;
}

export default function ListItem({children}: ListItemProps) {

  return (
       <div className='list-item'>{children}</div>
  )
}