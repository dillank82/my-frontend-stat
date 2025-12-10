import { useGetAllSitesQuery } from "../../features/api/tasksApi"

export const useCalculateTotalTasks = () => {
    const { data: sites = [] } = useGetAllSitesQuery()

    const solvedTasks = sites.reduce((accumulator, site) => accumulator + (site.solved || 0), 0)
    const failedTasks = sites.reduce((accumulator, site) => accumulator + (site.failed || 0), 0)
    const allTasks = solvedTasks + failedTasks

    return {
        solved: solvedTasks,
        failed: failedTasks,
        all: allTasks
    }
}