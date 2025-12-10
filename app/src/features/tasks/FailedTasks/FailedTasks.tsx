import type { ReactElement } from "react"
import { useCurrentSite } from "../../../hooks/useCurrentSite/useCurrentSite"
import { StatDisplay } from "../../../components/StatDisplay/StatDisplay"
import { useCalculateTotalTasks } from "../../../hooks/useCalculateTotalTasks/useCalculateTotalTasks"


export const FailedTasks = (): ReactElement => {

    const currentSite = useCurrentSite()
    const totalFailed: number = useCalculateTotalTasks().failed

    const failedTasks: number = currentSite ? (currentSite.failed || 0) : totalFailed

    return (
        <>
            <StatDisplay variant="small" text="Провалено" value={failedTasks}/>
        </>
    )
}