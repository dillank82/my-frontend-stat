import type { ReactElement } from "react"
import { CircularPercentage, type CircularPercentageProps } from "../CircularPercentage/CircularPercentage"
import { useCurrentSite } from "../../../hooks/useCurrentSite/useCurrentSite"
import { useCalculateTotalTasks } from "../../../hooks/useCalculateTotalTasks/useCalculateTotalTasks"
import { SolvedTaskPercentageDisplay } from "../SolvedTaskPercentageDisplay/SolvedTaskPercentageDisplay"

export type CircularPercentageWrapperProps = Omit<CircularPercentageProps, 'percent'>

export const CircularPercentageWrapper = (props: CircularPercentageWrapperProps): ReactElement => {

    const currentSite = useCurrentSite()

    const calculatePercent = () => {
        const { solved: totalSolved, all: totalAll } = useCalculateTotalTasks()
        let solved: number
        let all: number
        if (currentSite) {
            const failed = (currentSite.failed || 0)
            solved = (currentSite.solved || 0)
            all = solved + failed
        } else {
            solved = totalSolved
            all = totalAll
        }
        if (all === 0) return 0
        const percent = solved / all * 100
        const roundedPercent = parseFloat(percent.toFixed(2))
        return roundedPercent
    }

    return (
        <>
            <CircularPercentage
                percent={calculatePercent()}
                radius={props.radius}
                strokeWidth={props.strokeWidth}
                backgroundColor={props.backgroundColor}
                progressColor={props.progressColor}
                glow={props.glow}
                glowColor={props.glowColor}
                glowBlur={props.glowBlur}
            >
                <SolvedTaskPercentageDisplay percent={calculatePercent()} />
            </CircularPercentage>
        </>
    )
}