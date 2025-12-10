import { Projects } from "../features/projects/Projects"
import type { CircularPercentageWrapperProps } from "../features/tasks/CircularPercentageWrapper/CircularPercentageWrapper"
import { TotalTasksCompleted } from "../features/tasks/TotalTasksCompleted/TotalTasksCompleted"
import { Hours } from "../features/time/Hours/Hours"

export const portfolioLink: string = 'https://github.com/dillank82'
export const statBlockConfig = {
    totalStatBlockComponentsToRender: [
        { id: 'hours', component: Hours },
        { id: 'projects', component: Projects },
        { id: 'tasks', component: TotalTasksCompleted },
    ]
}
export const detailedStatBlockConfig = {
    circularPercentageWrapperProps: {
        radius: 100,
        strokeWidth: 5,
        backgroundColor: '#16151bff',
        progressColor: '#ffffff',
        glow: true,
        glowColor: '#00fff2ff',
        glowBlur: 5,
    } as CircularPercentageWrapperProps // ошибка с обработкой типа цветов
}