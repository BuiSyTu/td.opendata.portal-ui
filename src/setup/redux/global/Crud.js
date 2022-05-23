import axios from 'axios'
import {CONFIG} from '../../../helpers/config'

export const GetUserInfo = async (data) => {
  return axios.post(CONFIG.GETWAY_URL + '/GetUserInfo', data, {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${CONFIG.GETWAY_TOKEN}`,
  })
}
