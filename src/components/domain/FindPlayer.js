import styled from 'styled-components'
import { useStore } from 'statux'
import React, { useEffect, useState } from 'react'
import store from '../../store'
import Button from '../core/Button'
import { isEnterKey } from '../../lib/keyboard'

const SearchPlayer = styled.input`
  border: 1px solid ${(props) => props.theme.colors.button};
  background: white;
  color: #243949;
  display: inline-block;
  padding: 5px 15px;
`

const Container = styled.div`
  display: flex;
  height: ${(props) => props.theme.size.M};
`

export default function FindPlayer() {
  const [search, setSearch] = useStore(store.search)
  const [pagination, setPagination] = useStore(store.pagination)
  const [name, setName] = useState('')

  useEffect(() => {
    setName(search)
  }, [search])

  function onChange(e) {
    setName(e.target.value)
  }

  function onClick() {
    setPagination({ ...pagination, rank: 1 })
    setSearch(name)
  }

  function onKeyDown(event) {
    if (isEnterKey(event)) {
      onClick()
    }
  }

  return (
    <Container>
      <SearchPlayer
        type={'text'}
        placeholder={'Player name'}
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={name}
      />
      <Button onClick={onClick}>Find</Button>
    </Container>
  )
}
