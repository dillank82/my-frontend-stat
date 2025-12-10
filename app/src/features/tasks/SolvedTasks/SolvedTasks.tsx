import type { ReactElement } from "react"
import { useCurrentSite } from "../../../hooks/useCurrentSite/useCurrentSite"
import { useCalculateTotalTasks } from "../../../hooks/useCalculateTotalTasks/useCalculateTotalTasks"
import { StatDisplay } from "../../../components/StatDisplay/StatDisplay"


export const SolvedTasks = (): ReactElement => {

    const currentSite = useCurrentSite()
    const totalSolved: number = useCalculateTotalTasks().solved || 0
    
    const solvedTasks: number = currentSite ? (currentSite.solved || 0) : totalSolved

    return (
        <>
            <StatDisplay variant={'small'} text="Решено" value={solvedTasks} />
        </>
    )
}