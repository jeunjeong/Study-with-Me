import { useDrop } from 'react-dnd'

const ItemType = 'GRID_SQUARE'

interface TrashCanProps {
  deleteGridSquare: (id: number) => void
}

function TrashCan({ deleteGridSquare }: TrashCanProps) {
  const [, drop] = useDrop(
    () => ({
      accept: ItemType,
      drop: (item: { id: number }) => {
        deleteGridSquare(item.id)
      }
    }),
    [deleteGridSquare]
  )

  return (
    <div
      ref={drop}
      style={{
        position: 'fixed',
        bottom: 20,
        zIndex: 2,
        backgroundColor: 'red',
        width: '50px',
        height: '50px'
      }}
    >
      Trash Can
    </div>
  )
}

export default TrashCan
