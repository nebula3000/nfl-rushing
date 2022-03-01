import styled from 'styled-components'

function nth(n) {
  if (n > 3 && n < 21) {
    n = -1 // force default
  }
  switch (n % 10) {
    case 1:
      return 'st'
    case 2:
      return 'nd'
    case 3:
      return 'rd'
    default:
      return 'th'
  }
}

function rank(oneBasedN) {
  return oneBasedN + nth(oneBasedN)
}

const Container = styled.div`
  color: ${(props) => props.theme.colors.text};
  background-color: ${(props) => props.theme.colors.primary_500};
  padding: ${(props) => props.theme.spacing.M};
  display: inline-block;
  font-variant: small-caps;
  font-weight: 700;
  min-width: ${(props) => props.theme.spacing.XL};
`

export default function Rank({ r }) {
  return <Container>{rank(r)}</Container>
}
