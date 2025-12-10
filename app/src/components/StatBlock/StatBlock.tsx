import type { ReactElement } from "react"
import { TotalStatsBlock } from "../TotalStatsBlock/TotalStatsBlock"
import './StatBlock.css'
import { DetailedTasksStatBlock } from "../../features/tasks/DetailedTasksStatBlock/DetailedTasksStatBlock"
import { statBlockConfig } from "../../config/siteSettings"

export const StatBlock = (): ReactElement => {
    const statFields = statBlockConfig.totalStatBlockComponentsToRender
    return (
        <>
            <div className="stat-block">
                <TotalStatsBlock statFields={ statFields } />
                <DetailedTasksStatBlock />
            </div>
        </>
    )
}