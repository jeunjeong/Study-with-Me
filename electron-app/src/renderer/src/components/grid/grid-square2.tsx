import React from 'react'
import * as Style from './style'
import { useDrag, useDrop } from 'react-dnd'

const ItemType = 'GRID_SQUARE'

interface GridSquareProps {
  id: number
  content: React.ReactNode
  moveGridSquare: (fromId: number, toId: number) => void
}

function GridSquare2({ id, content, moveGridSquare }: GridSquareProps) {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemType,
      item: { id },
      collect: (monitor) => ({
        isDragging: monitor.isDragging()
      }),
      end: (item, monitor) => {}
    }),
    [id]
  )

  const [, drop] = useDrop(
    () => ({
      accept: ItemType,
      hover: (draggedItem: { id: number }) => {
        if (draggedItem.id !== id) {
          moveGridSquare(draggedItem.id, id)
        }
      }
    }),
    [id, moveGridSquare]
  )

  const opacity = isDragging ? 0.5 : 1 // 드래깅 중일 때 투명도ㄹ를 줘서 알아보기쉽게

  return (
    <Style.Square2 ref={(node) => drag(drop(node))} style={{ opacity }}>
      {content}
    </Style.Square2>
  )

  // if (content === 'Test1') {
  //   return (
  //     <Style.test1 ref={(node) => drag(drop(node))} style={{ opacity }}>
  //       {where}
  //     </Style.test1>
  //   )
  // } else {
  //   return (
  //     <Style.test2 ref={(node) => drag(drop(node))} style={{ opacity }}>
  //       {where}
  //     </Style.test2>
  //   )
  // }
}

export default GridSquare2
