import { URL_HEALTHYBODY_BASE } from 'constants/Settings'
import axios from 'axios'

// path("", views.DailyListAPIView.as_view()),
// path("daily/", views.CreateDaily.as_view()),
// path("daily/<str:pk>/", views.DetailDaily.as_view()),
// path("macho/", views.MachoListAPIView.as_view()),
// path("macho/<int:pk>/", views.DetailMacho.as_view()),
// path("macho_create/", views.CreateMacho.as_view()),
// path("category/<str:cat>", views.CategoryDaily.as_view()),



export const healthBodyAxios = axios.create({
    baseURL: URL_HEALTHYBODY_BASE,
})


export const getDailyList = () => {
    return ""
}

export const createDaily = () => {
    return "daily/"
}

export const getDailyDetail = (date: String) => {
    return  `daily/${date}`
}

export const getMachoList = () => {
    return "macho/"
}

export const createMacho = () => {
    return "macho_create/"
}

export const getByCateogry = (cat: String) => {
    return `category/${cat}`
}