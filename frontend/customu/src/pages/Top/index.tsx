import React from 'react'
import {getDaily } from "api/backend/healthybody";

export const Top: React.FC = () => {
    // const [daily, setDaily] = useState<[]>()
    const daily = getDaily()
    console.log(daily)
    const temp = 2
    // useEffect(() => {
    //     const temp = getDaily
    //     setDaily(temp)
    //   }, [])
    return(
        <div>
            <h1>{temp}</h1>
        </div>
    )
}