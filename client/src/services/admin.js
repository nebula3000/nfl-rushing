import axios from 'axios'
import { api } from '../api'

export class Admin {
  constructor(api) {
    this.api = api
  }

  async generate(total) {
    const result = await axios.post(this.api.urls.admin(total))
    const { error } = result.data
    return { error }
  }
}

export default new Admin(api)
