import Title from '../components/elements/Title'
import Header from '../components/core/Header'
import FindPlayer from '../components/domain/FindPlayer'
import Sorters from '../components/domain/Sorters'
import Leaderboard from '../components/domain/Leaderboard'
import { Download } from '../components/domain/Download'
import React from 'react'
import Pagination from '../components/domain/Pagination'

function Home() {
  return (
    <div>
      <Header>
        <Title left={'Leader'} right={'board'} />
        <FindPlayer />
      </Header>
      <Sorters />
      <Leaderboard />
      <Pagination />
      <Download />
    </div>
  )
}

export default Home
