import styled from 'styled-components'
import Button from '../core/Button'

const PaginationButton = styled(Button)`
  visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};
`

export default PaginationButton
