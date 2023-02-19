import React, {useState, useEffect} from 'react'
import {healthBodyAxios, getDailyList } from "api/axios/healthybody";

export const Top: React.FC = () => {
    const [daily, setDaily] = useState<4>()
    // const [detail, setDetail] = useState<[]>()

    useEffect(() => {
        async function fetchData() {
        const response = await healthBodyAxios.get(getDailyList())
        setDaily(response.data[2].evaluation)
        }
    fetchData();
    }, [])
    return(
        <div>
            <h1>{daily}</h1>
        </div>
    )
}