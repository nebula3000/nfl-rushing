import styled from 'styled-components'
import Rank from '../core/Rank'
import PlayerInfo from './PlayerInfo'
import Stat from './Stat'
import { FaFootballBall } from 'react-icons/fa'

const Container = styled.div`
  padding-bottom: ${(props) => props.theme.spacing.S};
  padding-top: ${(props) => props.theme.spacing.S};
`

const PlayerInfoContainer = styled.div`
  background-color: ${(props) => props.theme.colors.primary_000};
  margin: 0 0 ${(props) => props.theme.spacing.M} 0;
`

const StatsContainer = styled.div`
  display: grid;
  grid-auto-flow: row;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  grid-template-rows: repeat(auto-fill, 1fr);
  column-gap: ${(props) => props.theme.spacing.M};
`

const FootballIcon = styled(FaFootballBall)`
  color: ${(props) => props.theme.colors.football};
  font-size: ${(props) => props.theme.size.XS};
  padding-left: 5px;
`

function renderFootball(touchdown) {
  if (touchdown) {
    return <FootballIcon />
  }

  return null
}

export default function Player(attributes, i) {
  return (
    <Container key={i}>
      <PlayerInfoContainer>
        <Rank r={attributes['rank']} />
        <PlayerInfo attributes={attributes} />
      </PlayerInfoContainer>
      <StatsContainer>
        <Stat attributes={attributes} name="pos" label="pos" />
        <Stat attributes={attributes} name="avg" label="Avg" />
        <Stat attributes={attributes} name="att" label="Att" />
        <Stat attributes={attributes} name="att_g" label="Att/G" />
        <Stat attributes={attributes} name="yds" label="Yds" />
        <Stat attributes={attributes} name="yds_g" label="Yds/G" />
        <Stat attributes={attributes} name="td" label="TD" />
        <Stat attributes={attributes} name="lng" label="Lng">
          {renderFootball(attributes['lng_t'])}
        </Stat>
        <Stat attributes={attributes} name="rush_1" label="1st" />
        <Stat attributes={attributes} name="rush_1_perc" label="1st%" />
        <Stat attributes={attributes} name="rush_20" label="20+" />
        <Stat attributes={attributes} name="rush_40" label="40+" />
        <Stat attributes={attributes} name="fumbles" label="Fumbles" />
      </StatsContainer>
    </Container>
  )
}
