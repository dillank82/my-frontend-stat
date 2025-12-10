import type { ReactElement } from "react";
import './Hours.css'
import { useGetTimeQuery } from "../../api/timeApi";

export const Hours = (): ReactElement => {

    const { data: data, error, isLoading } = useGetTimeQuery()

    const minutes = data?.minutes || 0
    const hours: number = minutes / 60
    const roundedHours: number = parseFloat(hours.toFixed(2))
    

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Failed to fetch</div>

    return (
        <>
            <div className="time-counter">{roundedHours}ч</div>
        </>
    )
}