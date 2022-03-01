import styled from 'styled-components'
import { useSelector, useStore } from 'statux'
import store from '../../store'
import PaginationButton from '../elements/PaginationButton'
import React, { useEffect, useState } from 'react'
import AutosizeInput from 'react-input-autosize'
import { isNumber } from '../../lib/keyboard'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`

const rankInputStyles = {
  backgroundColor: 'rgba(255,255,255,0.1)',
  padding: 5,
  border: 'none',
  color: 'white',
  outline: 'none',
}

function RankInput({ rank }) {
  const [pagination, setPagination] = useStore(store.pagination)
  const [inputValue, setValue] = useState(Math.max(Number(rank || 0), 1))

  useEffect(
    function () {
      setValue(rank)
    },
    [rank]
  )

  const onChange = (e) => setValue(Number(e.currentTarget.value))
  const onBlur = () =>
    setPagination({ ...pagination, rank: Number(inputValue || 1) })

  return (
    <AutosizeInput
      inputStyle={rankInputStyles}
      value={inputValue}
      onKeyDown={isNumber}
      onBlur={onBlur}
      onChange={onChange}
    />
  )
}

const Jump = ({ rank, total }) => {
  if (total < 1) {
    return <div />
  }

  return (
    <span>
      <RankInput rank={rank} total={total} /> / {total}
    </span>
  )
}

export default function Pagination() {
  const [pagination, setPagination] = useStore(store.pagination)
  const { hasPrevious, hasNext, rank, total } = pagination

  function onClickPrevious() {
    const newRank = pagination.rank - pagination.offset
    setPagination({ ...pagination, rank: Math.max(1, newRank) })
  }

  function onClickNext() {
    const newRank = pagination.rank + pagination.offset
    setPagination({ ...pagination, rank: Math.min(total, newRank) })
  }

  return (
    <Container>
      <PaginationButton visible={hasPrevious} onClick={onClickPrevious}>
        Previous
      </PaginationButton>
      <Jump rank={rank} total={total} />
      <PaginationButton visible={hasNext} onClick={onClickNext}>
        Next
      </PaginationButton>
    </Container>
  )
}
