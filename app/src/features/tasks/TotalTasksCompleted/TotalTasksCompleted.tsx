import type { ReactElement } from "react";
import { StatDisplay } from "../../../components/StatDisplay/StatDisplay";
import { useCalculateTotalTasks } from "../../../hooks/useCalculateTotalTasks/useCalculateTotalTasks";

export const TotalTasksCompleted = (): ReactElement => {

    const totalTasksCompleted = (useCalculateTotalTasks().solved || 0)

    return (
        <>
            <StatDisplay text="Всего задач решено" value={totalTasksCompleted}/>
        </>
    )
}