import styled from 'styled-components'

const Left = styled.span`
  color: ${(props) => props.theme.colors.title};
`

const Right = styled.span``

const Container = styled.span`
  font-family: 'Bebas Neue';
  font-size: ${(props) => props.theme.size.XXL};
  line-height: ${(props) => props.theme.size.XL};
`

export default function Title({ left, right }) {
  return (
    <Container>
      <Left>{left}</Left>
      <Right>{right}</Right>
    </Container>
  )
}
