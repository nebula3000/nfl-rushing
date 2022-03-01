import styled from 'styled-components'
import { useSelector, useStore } from 'statux'
import store from '../../store'
import { changeDirection } from '../../lib/direction'
import { ImSortAmountAsc, ImSortAmountDesc } from 'react-icons/im'

const Group = styled.div`
  display: inline-flex;
  gap: ${(props) => props.theme.spacing.L};
  font-family: unset;
`

const Sorter = styled.span`
  font-size: x-large;

  &:hover {
    cursor: pointer;
  }

  &:hover:before {
    transform: none;
    opacity: 1;
    left: 0;
    width: 100%;
    transition-duration: 0.4s;
  }

  &:before {
    content: '';
    position: relative;
    width: 0%;
    height: 2px;
    left: 100%;
    top: 35px;
    display: block;
    background: ${(props) => props.theme.colors.primary_500};
    transform: translateY(6px);
    opacity: 0;
    transition: 1.1s cubic-bezier(0.2, 1, 0.2, 1);
    pointer-events: none;
  }
`

const Container = styled.div`
  text-align: right;
  font-variant: all-small-caps;
`

const AscIcon = styled(ImSortAmountAsc)`
  color: white;
  font-size: 1.3rem;
  vertical-align: middle;
  padding-left: 5px;
`

const DescIcon = styled(ImSortAmountDesc)`
  color: white;
  font-size: 1.3rem;
  vertical-align: middle;
  padding-left: 5px;
`

function renderSortIcon(sorter, { by, direction }) {
  if (sorter !== by) {
    return null
  }

  switch (by) {
    case 'longest_rush':
      return direction === 'asc' ? <AscIcon /> : <DescIcon />
    case 'total_rushing_yards':
      return direction === 'asc' ? <AscIcon /> : <DescIcon />
    case 'total_rushing_touchdowns':
      return direction === 'asc' ? <AscIcon /> : <DescIcon />
  }
}

export default function Sorters() {
  const [sort, setSort] = useStore(store.sort)
  function onClick(by) {
    return () => {
      if (by !== sort.by) {
        setSort({ ...sort, by })
      } else {
        setSort({ ...sort, by, direction: changeDirection(sort.direction) })
      }
    }
  }

  return (
    <Container>
      <div>Sort by:</div>
      <Group>
        <Sorter onClick={onClick('longest_rush')}>
          Longest Rush
          {renderSortIcon('longest_rush', sort)}
        </Sorter>
        <Sorter onClick={onClick('total_rushing_yards')}>
          Total Rushing Yards
          {renderSortIcon('total_rushing_yards', sort)}
        </Sorter>
        <Sorter onClick={onClick('total_rushing_touchdowns')}>
          Total Rushing Touchdowns
          {renderSortIcon('total_rushing_touchdowns', sort)}
        </Sorter>
      </Group>
    </Container>
  )
}
