import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react"
import { StatDisplay, type StatDisplayProps } from '../../../components/StatDisplay/StatDisplay'
import { FailedTasks } from './FailedTasks'
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

describe('FailedTasks', () => {
    beforeEach(() => {
        jest.clearAllMocks()
        mockUseCurrentSite.mockReturnValue({ failed: 33 })
        mockUseCalculateTotalTasks.mockReturnValue({ failed: 9 })
    })

    it('должен отбражать количество проваленных задач на выбранном сайте и рендерить StatDisplay с корректным селектором', () => {
        render(<FailedTasks />)
        const tasks = screen.getByText(33)
        expect(tasks).toBeInTheDocument()
        expect(StatDisplay).toHaveBeenCalledWith(expect.objectContaining({ variant: 'small' }), undefined)
    })
    it('должен корректно выводить сумму решённых заданий при отсутствии выбранного сайта', () => {
        mockUseCurrentSite.mockReturnValue(undefined)
        render(<FailedTasks />)
        const tasks = screen.getByText(9)
        expect(tasks).toBeInTheDocument()
    })
    it('должен выводить 0 при отсутствии данных о проваленных задачах в объекте выбранного сайта', () => {
        mockUseCurrentSite.mockReturnValue({})
        render(<FailedTasks />)
        const tasks = screen.getByText(0)
        expect(tasks).toBeInTheDocument()
    })
})