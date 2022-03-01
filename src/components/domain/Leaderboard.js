import Player from './Player'
import styled from 'styled-components'
import React, { useEffect, useMemo } from 'react'
import { useSelector, useStore } from 'statux'
import store from '../../store'
import Search from '../../services/search'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { api } from '../../api'
const Container = styled.div`
  margin: ${(props) => props.theme.spacing.XL} 0;
`
export default function Leaderboard() {
  const [players, setPlayers] = useStore(store.players)
  const [pagination, setPagination] = useStore(store.pagination)
  const [{ by, direction }, setSort] = useStore(store.sort)
  const [search, setSearch] = useStore(store.search)
  const [loaded, setLoaded] = useStore(store.loaded)
  const history = useNavigate()
  const [searchParams] = useSearchParams()

  useEffect(async () => {
    if (!loaded) {
      const query = searchParams.get('q')
      if (query) {
        const tokens = query.split(':')
        if (tokens.length > 0) {
          setSearch(tokens[0])
        }
        if (tokens.length > 1) {
          setSort({ by: tokens[1], direction: 'desc' })
        }
        if (tokens.length > 2) {
          setSort({ by: tokens[1], direction: tokens[2] })
        }
      }
      const rank = searchParams.get('rank') || 1
      if (rank) {
        setPagination({ ...pagination, rank: Number(rank || 1) })
      }

      setLoaded(true)
      return
    }

    const { players, total } = await Search.fetch({
      name: search,
      sortBy: by,
      direction,
      rank: pagination.rank,
    })

    const hasPrevious = pagination.rank > 1 && total > pagination.offset
    const hasNext = pagination.rank + pagination.offset < total
    const rank = Math.max(total === 0 ? 0 : pagination.rank, 1)
    setPagination({ ...pagination, total, hasPrevious, hasNext, rank })
    setPlayers(players)
    history({
      pathname:
        '?' +
        api.searchQueryParams({ query: search, direction, sortBy: by, rank }),
      replace: true,
    })
  }, [loaded, search, by, direction, pagination.rank])

  return <Container>{players.map(Player)}</Container>
}
