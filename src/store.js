export const initialValue = {
  players: [],
  search: '',
  sort: {
    by: 'longest_rush',
    direction: 'desc',
  },
  pagination: {
    hasNext: true,
    hasPrevious: true,
    rank: 0,
    offset: 10,
    total: 0,
  },
  loaded: false,
}

const keys = Object.keys(initialValue).reduce((memo, key) => {
  memo[key] = key.toString()
  return memo
}, {})

export default keys
