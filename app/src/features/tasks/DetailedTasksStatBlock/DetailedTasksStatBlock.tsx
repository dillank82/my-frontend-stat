import type { ReactElement } from "react"
import { CurrentSiteSelector } from "../CurrentSiteSelector/CurrentSiteSelector"
import { SolvedFailedTasksWrapper } from "../SolvedFailedTasksWrapper/SolvedFailedTasksWrapper"
import { CircularPercentageWrapper, type CircularPercentageWrapperProps } from "../CircularPercentageWrapper/CircularPercentageWrapper"
import './DetailedTasksStatBlock.css'
import { detailedStatBlockConfig } from "../../../config/siteSettings"

export const DetailedTasksStatBlock = (): ReactElement => {
    const props: CircularPercentageWrapperProps = detailedStatBlockConfig.circularPercentageWrapperProps
    return (
        <>
            <div className="detailed-stats">
                <CurrentSiteSelector />
                <CircularPercentageWrapper {...props}/>
                <SolvedFailedTasksWrapper />
            </div>
        </>
    )
}