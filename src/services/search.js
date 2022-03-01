import axios from 'axios'
import { api } from '../api'

export class Search {
  constructor(api) {
    this.api = api
  }

  async fetch({ name, sortBy, direction, rank } = {}) {
    const result = await axios.get(
      this.api.urls.search({ query: name, sortBy, direction, rank })
    )
    const { players, total } = result.data
    return { players, total: Number(total || 0) }
  }
}

export default new Search(api)
