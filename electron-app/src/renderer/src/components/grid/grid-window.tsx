import React, { useState, useEffect } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import * as Style from './style'
import GridSquare from './grid-square'
import TrashCan from './trashcan'
import Test from './test'
import Test2 from './test2'
import { useRecoilState, useRecoilValue } from 'recoil'
import { gridWindowState, mainToolState } from '@renderer/recoil/toolatom'

// 위치 저장을 위한 로컬 스토리지 키
const STORAGE_KEY = 'grid_positions'

interface Component {
  id: number
  type: string
}

function GridWindow() {
  // 각 GridSquare의 내용을 관리할 상태
  const [components, setComponents] = useRecoilState(gridWindowState)
  const Trash = useRecoilValue(mainToolState)

  const deleteGridSquare = (id: number) => {
    const newComponents = components.filter((c) => c.id !== id)
    setComponents(newComponents)
  }

  // 위치 저장
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(components))
  }, [components])

  const moveGridSquare = (fromId, toId) => {
    const fromIndex = components.findIndex((c) => c.id === fromId)
    const toIndex = components.findIndex((c) => c.id === toId)
    // 배열복사
    const newComponents = [...components]
    // 요소를 임시로 저장하고 삭제
    const [removedElement] = newComponents.splice(fromIndex, 1)
    // 새 위치에 요소 삽입
    newComponents.splice(toIndex, 0, removedElement)
    // 상태 업데이트
    setComponents(newComponents)
  }

  const renderComponent = (component) => {
    let content
    let row
    let col
    switch (component.type) {
      case 'Test':
        content = <Test key={component.id} />
        row = component.row
        col = component.col
        break
      case 'Test2':
        content = <Test2 key={component.id} />
        row = component.row
        col = component.col
        break
      default:
        content = null
    }

    // GridSquare 컴포넌트를 사용해서 content 래핑
    return (
      <GridSquare
        key={component.id}
        id={component.id}
        content={content}
        row={row}
        col={col}
        moveGridSquare={moveGridSquare}
      />
    )
  }

  return (
    <Style.GridDiv>
      <DndProvider backend={HTML5Backend}>
        {Trash === 1 && <TrashCan deleteGridSquare={deleteGridSquare} />}
        <Style.Test>{components.map(renderComponent)}</Style.Test>
      </DndProvider>
    </Style.GridDiv>
  )
}

export default GridWindow
