import { URL_BACKEND_BASE } from 'constants/Settings'
import axios from 'axios'

async function httpServiceGet(url: string): Promise<any> {
    try {
    const response = await axios.get<any>(url)
    window.alert(url)
    window.alert(response.data[0])
    return response.data
    } catch (e) {
        return []
    }
}

export const getDaily = async() => {
    const data = await httpServiceGet(URL_BACKEND_BASE + "/healthybody/")
    return data
}

export const getDailyDetail = async (id: Number) => {
    return await httpServiceGet(URL_BACKEND_BASE + "/healthybody/" + `${id}`)
}
