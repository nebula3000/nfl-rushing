import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    padding: 40px;
    height: 100vh;
    color: ${(props) => props.theme.colors.text};
    background-color: ${(props) => props.theme.colors.background};
    font-family: 'Lato';
  }
`

export default GlobalStyle
