import type { ReactElement } from "react"
import { useCurrentSite } from "../../../hooks/useCurrentSite/useCurrentSite"
import './CurrentSiteDisplay.css'

export const CurrentSiteDisplay = (): ReactElement => {

    const siteName = useCurrentSite()?.name || 'All sites'

    return (
        <>
            <span className="current-site-display">{siteName}</span>
        </>
    )
}