import type { ReactElement } from "react"
import { PrevNextButton } from "../../../components/PrevNextButton/PrevNextButton"
import { nextCurrentSite, prevCurrentSite } from "../tasksSlice"
import { useAppDispatch } from "../../../store/hooks"
import { CurrentSiteDisplay } from "../CurrentSiteDisplay/CurrentSiteDisplay"
import { useGetAllSitesQuery } from "../../api/tasksApi"
import './CurrentSiteSelector.css'

export const CurrentSiteSelector = (): ReactElement => {

    const siteCount = useGetAllSitesQuery().data?.length || 0

    const dispatch = useAppDispatch()
    const handleNext = () => {
        dispatch(nextCurrentSite(siteCount))
    }
    const handlePrev = () => {
        dispatch(prevCurrentSite(siteCount))
    }

    return (
        <>
            <div className="site-selector">
                <PrevNextButton direction="prev" onClick={() => handlePrev()} />
                <CurrentSiteDisplay/>
                <PrevNextButton direction="next" onClick={() => handleNext()} />
            </div>
        </>
    )
}