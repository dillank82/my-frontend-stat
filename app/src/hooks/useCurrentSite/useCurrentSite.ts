import { useGetAllSitesQuery } from "../../features/api/tasksApi.ts"
import { useAppSelector } from "../../store/hooks.ts"

export const useCurrentSite = () => {
    const currentSiteIndex: number = useAppSelector(state => state.tasks.currentSiteIndex)
    if (currentSiteIndex < 0) {
        throw new Error (`[useCurrentSite] Index out of bounds: ${currentSiteIndex}`)
    }

    const { data: sites = []} = useGetAllSitesQuery()
    const currentSite = sites.find(e => e.orderIndex === currentSiteIndex)
    
    return currentSite
}