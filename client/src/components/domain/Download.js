import { GoDesktopDownload } from 'react-icons/go'
import styled from 'styled-components'
import { api } from '../../api'
import { useSelector, useStore } from 'statux'
import store from '../../store'

const DownloadLink = styled.a`
  font-size: ${(props) => props.theme.size.M};
  color: ${(props) => props.theme.colors.text};
  text-decoration: none;
`

const Container = styled.div`
  text-align: right;
  margin-top: ${(props) => props.theme.spacing.XL};
`

export function Download() {
  const search = useSelector(store.search)
  const { by, direction } = useSelector(store.sort)
  return (
    <Container>
      <DownloadLink
        href={api.urls.export({ query: search, sortBy: by, direction })}
      >
        <GoDesktopDownload />
      </DownloadLink>
    </Container>
  )
}
