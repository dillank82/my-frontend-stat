import type { ReactElement } from "react";
import { StatDisplay } from "../../components/StatDisplay/StatDisplay";
import { useGetProjectsQuery } from "../api/projectsApi";

export const Projects = (): ReactElement => {

    const { data: data, error, isLoading } = useGetProjectsQuery()
    const projects = data?.projectsCount || 0

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Failed to fetch</div>

    return (
        <>
            <StatDisplay text="Проектов завершено" value={projects}/>
        </>
    )
}