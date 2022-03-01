const prefix = '/api'

function searchQueryParams({ query, rank, offset, sortBy, direction }) {
  const params = new URLSearchParams()

  let q = ''
  if (query) {
    q += query
  }
  if (sortBy) {
    q += ':' + sortBy
  }
  if (direction) {
    q += ':' + direction
  }
  if (q) {
    params.append('q', q)
  }

  if (offset) {
    params.append('offset', offset)
  }

  if (rank) {
    params.append('rank', rank)
  }

  return params.toString()
}

export const api = {
  searchQueryParams,
  urls: {
    admin: function (total) {
      return prefix + '/admin/generate/players/' + total
    },
    search: function ({ query, rank, offset, sortBy, direction }) {
      const path = prefix + `/search/players`
      const params = searchQueryParams({
        query,
        rank,
        offset,
        sortBy,
        direction,
      })
      if (params) {
        return `${path}?${params}`
      }
      return path
    },
    export: function ({ query, rank, offset, sortBy, direction }) {
      const path = prefix + `/export/players.csv`
      const params = searchQueryParams({
        query,
        rank,
        offset,
        sortBy,
        direction,
      })
      if (params) {
        return `${path}?${params}`
      }
      return path
    },
  },
}
