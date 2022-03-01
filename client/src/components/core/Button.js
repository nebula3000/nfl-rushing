import styled from 'styled-components'

const Button = styled.button`
  display: inline-block;
  padding: 5px 15px;
  background: ${(props) => props.theme.colors.button};
  border: 1px solid ${(props) => props.theme.colors.button};
  color: ${(props) => props.theme.colors.buttonText};
  z-index: 2;
  cursor: pointer;
  border-radius: 0;

  &:hover {
    display: inline-block;
    background: rgb(95 58 173 / 30%) !important;
    border: 1px solid #6f4ea7;
    transition: 0.3s ease-out;
  }
`

export default Button
