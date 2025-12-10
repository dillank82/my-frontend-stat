import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react"
import { type StatDisplayProps } from '../../../components/StatDisplay/StatDisplay'
import { TotalTasksCompleted } from './TotalTasksCompleted'
import { useCalculateTotalTasks } from '../../../hooks/useCalculateTotalTasks/useCalculateTotalTasks'

jest.mock('../../../components/StatDisplay/StatDisplay', () => ({
    StatDisplay: jest.fn(({ text, value }: StatDisplayProps) => <div>{text}:<div>{value}</div></div>)
}))
jest.mock('../../../hooks/useCalculateTotalTasks/useCalculateTotalTasks', () => ({
    useCalculateTotalTasks: jest.fn()
}))

const mockUseCalculateTotalTasks = useCalculateTotalTasks as jest.Mock

describe('TotalTasksCompleted', () => {
    beforeEach(() => {
        jest.clearAllMocks()
        mockUseCalculateTotalTasks.mockReturnValue({ solved: 9 })
    })

    it('должен верно отображать сумму решённых на сайтах задач', () => {
        render(<TotalTasksCompleted />)
        const tasks = screen.getByText(9)
        expect(tasks).toBeInTheDocument()
    })
    it('должен выводить 0, если данные о решённых задачах отсутствуют', () => {
        mockUseCalculateTotalTasks.mockReturnValue({})
        render(<TotalTasksCompleted />)
        const tasks = screen.getByText(0)
        expect(tasks).toBeInTheDocument()
    })
})