import styled, { ThemeProvider } from 'styled-components'
import { GlobalStyle, theme } from './theme'
import Store from 'statux'
import Home from './pages/Home'
import { initialValue } from './store'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Admin from './pages/Admin'

const Container = styled.div`
  padding: 40px;
  box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.5);
  max-width: 80vw;
  margin: auto;
`

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Container>
          <GlobalStyle />
          <Store {...initialValue}>
            <Routes>
              <Route path="admin" element={<Admin />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </Store>
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
