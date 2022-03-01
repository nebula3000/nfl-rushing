import styled from 'styled-components'
import Button from '../components/core/Button'
import { useState } from 'react'
import AdminService from '../services/admin'

const Title = styled.div`
  font-size: ${(props) => props.theme.size.L};
  margin-bottom: 20px;
`

const ButtonsContainer = styled.div`
  display: flex;
  gap: 20px;
`

const GeneratingContainer = styled.div`
  padding-top: 20px;
`

function Admin() {
  const [generating, setGenerating] = useState(false)
  function onClick(total) {
    return async function () {
      setGenerating(true)
      await AdminService.generate(total)
      setGenerating(false)
    }
  }

  return (
    <div>
      <Title>Generate random players</Title>
      <ButtonsContainer>
        <Button onClick={onClick(100)}>Generate 100</Button>
        <Button onClick={onClick(1000)}>Generate 1000</Button>
        <Button onClick={onClick(100_000)}>Generate 100,000</Button>
        <Button onClick={onClick(1_000_000)}>
          Generate 1,000,000 (takes some time)
        </Button>
      </ButtonsContainer>
      {generating && <GeneratingContainer>Generating...</GeneratingContainer>}
    </div>
  )
}

export default Admin
