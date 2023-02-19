import { URL_BACKEND_BASE } from 'constants/Settings'
import axios from 'axios'


export const healthBodyAxios = axios.create({
    baseURL: URL_BACKEND_BASE,
})

export const getDailyList = () => {
    return "/healthybody/"
}


export const getDailyDetail = (id: Number) => {
    return  `/healthybody/${id}`
}