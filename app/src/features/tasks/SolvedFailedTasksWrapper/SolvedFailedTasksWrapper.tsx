import type { ReactElement } from "react"
import { FailedTasks } from "../FailedTasks/FailedTasks"
import { SolvedTasks } from "../SolvedTasks/SolvedTasks"
import './SolvedFailedTasksWrapper.css'


export const SolvedFailedTasksWrapper = (): ReactElement => {

    return (
        <>
            <div className="solved-failed-tasks-wrapper">
                <SolvedTasks />
                <FailedTasks />
            </div>
        </>
    )
}