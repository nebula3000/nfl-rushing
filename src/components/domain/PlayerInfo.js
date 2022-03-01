import styled from 'styled-components'

const Container = styled.span`
  padding-bottom: ${(props) => props.theme.spacing.XS};
  background-color: ${(props) => props.theme.colors.primary_000};
  padding-left: ${(props) => props.theme.spacing.M};
`

export default function PlayerInfo({ attributes }) {
  const { player, team } = attributes
  return (
    <Container>
      <span>{player}</span> - <span>{team}</span>
    </Container>
  )
}
