import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react"
import { StatDisplay, type StatDisplayProps } from '../../../components/StatDisplay/StatDisplay'
import { SolvedTasks } from './SolvedTasks'
import { useCurrentSite } from '../../../hooks/useCurrentSite/useCurrentSite'
import { useCalculateTotalTasks } from '../../../hooks/useCalculateTotalTasks/useCalculateTotalTasks'

jest.mock('../../../components/StatDisplay/StatDisplay', () => ({
    StatDisplay: jest.fn(({ text, value }: StatDisplayProps) => <div>{text}:<div>{value}</div></div>)
}))
jest.mock('../../../hooks/useCurrentSite/useCurrentSite', () => ({
    useCurrentSite: jest.fn()
}))
jest.mock('../../../hooks/useCalculateTotalTasks/useCalculateTotalTasks', () => ({
    useCalculateTotalTasks: jest.fn()
}))

const mockUseCurrentSite = useCurrentSite as jest.Mock
const mockUseCalculateTotalTasks = useCalculateTotalTasks as jest.Mock

describe('SolvedTasks', () => {
    beforeEach(() => {
        jest.clearAllMocks()
        mockUseCurrentSite.mockReturnValue({ solved: 33 })
        mockUseCalculateTotalTasks.mockReturnValue({ solved: 9 })
    })

    it('должен отбражать количество решённых задач на выбранном сайте и рендерить StatDisplay с корректным селектором', () => {
        render(<SolvedTasks />)
        const tasks = screen.getByText(33)
        expect(tasks).toBeInTheDocument()
        expect(StatDisplay).toHaveBeenCalledWith(expect.objectContaining({ variant: 'small' }), undefined)
    })
    it('должен корректно выводить сумму решённых заданий при отсутствии выбранного сайта', () => {
        mockUseCurrentSite.mockReturnValue(undefined)
        render(<SolvedTasks />)
        const tasks = screen.getByText(9)
        expect(tasks).toBeInTheDocument()
    })
    it('должен выводить 0 при отсутствии данных о решённых задачах в объекте выбранного сайта', () => {
        mockUseCurrentSite.mockReturnValue({})
        render(<SolvedTasks />)
        const tasks = screen.getByText(0)
        expect(tasks).toBeInTheDocument()
    })
})