import React, { useState, useEffect } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import * as Style from './style'
import GridSquare from './grid-square'
import GridSquare2 from './grid-square2'
import Test from './test'
import Test2 from './test2'

// 위치 저장을 위한 로컬 스토리지 키
const STORAGE_KEY = 'grid_positions'

interface Component {
  id: number
  type: string
}

function GridWindow() {
  // 각 GridSquare의 내용을 관리할 상태
  const [components, setComponents] = useState<Component[]>([])

  // 위치 저장
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(components))
  }, [components])

  const addTest = () => {
    setComponents([...components, { id: components.length, type: 'Test' }])
  }

  const addTest2 = () => {
    setComponents([...components, { id: components.length, type: 'Test2' }])
  }

  const moveGridSquare = (fromId, toId) => {
    const fromIndex = components.findIndex((c) => c.id === fromId)
    const toIndex = components.findIndex((c) => c.id === toId)
    // 배열복사
    let newComponents = [...components]
    // 요소를 임시로 저장하고 삭제
    const [removedElement] = newComponents.splice(fromIndex, 1)
    // 새 위치에 요소 삽입
    newComponents.splice(toIndex, 0, removedElement)
    // 상태 업데이트
    setComponents(newComponents)
  }

  const renderComponent = (component) => {
    let content
    switch (component.type) {
      case 'Test':
        content = <Test key={component.id} />
        break
      case 'Test2':
        content = <Test2 key={component.id} />
        break
      default:
        content = null
    }

    // GridSquare 컴포넌트를 사용하여 content 래핑
    if (component.type == 'Test') {
      return (
        <GridSquare
          key={component.id}
          id={component.id}
          content={content}
          moveGridSquare={moveGridSquare}
        />
      )
    } else {
      return (
        <GridSquare2
          key={component.id}
          id={component.id}
          content={content}
          moveGridSquare={moveGridSquare}
        />
      )
    }
  }
  return (
    <Style.GridDiv>
      <button onClick={addTest}>추가1</button>
      <button onClick={addTest2}>추가2</button>
      <DndProvider backend={HTML5Backend}>
        <Style.Test>{components.map(renderComponent)}</Style.Test>
      </DndProvider>
    </Style.GridDiv>
  )
}

export default GridWindow
