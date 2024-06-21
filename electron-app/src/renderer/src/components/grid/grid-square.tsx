import React from 'react'
import * as Style from './style'
import { useDrag, useDrop } from 'react-dnd'

const ItemType = 'GRID_SQUARE'

interface GridSquareProps {
  id: number
  content: React.ReactNode
  row: number
  col: number
  moveGridSquare: (fromId: number, toId: number) => void
}

function GridSquare({
  id,
  content,
  row,
  col,
  moveGridSquare
}: GridSquareProps): React.ReactElement {
  const [{ isDragging }, drag] = useDrag<{ id: number }, unknown, { isDragging: boolean }>(
    {
      type: ItemType,
      item: { id },
      collect: (monitor) => ({
        isDragging: monitor.isDragging()
      }),
      end: () => {}
    },
    [id]
  )

  const [, drop] = useDrop<{ id: number }, unknown, unknown>(
    {
      accept: ItemType,
      hover: (draggedItem: { id: number }) => {
        if (draggedItem.id !== id) {
          moveGridSquare(draggedItem.id, id)
        }
      }
    },
    [id, moveGridSquare]
  )

  const opacity = isDragging ? 0.5 : 1

  return (
    <Style.Square
      ref={(node) => drag(drop(node))}
      style={{ opacity, gridRowEnd: `span ${row}`, gridColumnEnd: `span ${col}` }}
    >
      {content}
    </Style.Square>
  )
}

export default GridSquare
