import styled from 'styled-components'

const Container = styled.div`
  page-break-inside: avoid;
  min-height: 40px;
`

const Label = styled.div`
  text-transform: uppercase;
  font-size: ${(props) => props.theme.size.XS};
`

const Value = styled.div`
  font-weight: bold;
  font-size: ${(props) => props.theme.size.S};
  padding-top: ${(props) => props.theme.spacing.XS};
`

export default function Stat({ attributes, name, label, children }) {
  return (
    <Container>
      <Label>{label}</Label>
      <Value>
        {attributes[name]}
        {children}
      </Value>
    </Container>
  )
}
