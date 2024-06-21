import { Container, Button, Content } from './style'
import { mainToolState, gridWindowState, rowcolState } from '@renderer/recoil/toolatom'
import { useRecoilState } from 'recoil'

function MainTool(): React.ReactElement {
  const [, setMainToolstate] = useRecoilState(mainToolState)
  const [, setGridWindowState] = useRecoilState(gridWindowState)
  const [rowcol, setrowcol] = useRecoilState(rowcolState)

  const handleAddTest = (): void => {
    console.log(  )
    setGridWindowState((prevState) => [
      ...prevState,
      { id: prevState.length, type: 'Test', row: 1, col: 1 }
    ])
    setrowcol((prevState) => ({
      row: prevState.row,
      col: prevState.col
    }))
  }

  const handleAddTest2 = (): void => {
    setGridWindowState((prevState) => [
      ...prevState,
      { id: prevState.length, type: 'Test2', row: 2, col: 2 }
    ])
    setrowcol((prevState) => ({
      row: prevState.row,
      col: prevState.col
    }))
  }

  const handleButtonClick = (): void => {
    setMainToolstate(0)
  }
  return (
    <Container>
      <Content>
        <Button onClick={handleAddTest}>추가1</Button>
        <Button onClick={handleAddTest2}>추가2</Button>
        <button onClick={handleButtonClick}>완료</button>
      </Content>
    </Container>
  )
}

export default MainTool
