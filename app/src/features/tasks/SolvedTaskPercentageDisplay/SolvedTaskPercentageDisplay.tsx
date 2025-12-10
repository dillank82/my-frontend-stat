import type { ReactElement } from "react"
import './SolvedTaskPercentageDisplay.css'

interface SolvedTaskPercentageDisplay {
    percent: number
}

export const SolvedTaskPercentageDisplay = ({ percent }: SolvedTaskPercentageDisplay): ReactElement => {

    return (
        <>
            <span className="percent-of-solved-tasks">{percent || 0}%</span>
        </>
    )
}