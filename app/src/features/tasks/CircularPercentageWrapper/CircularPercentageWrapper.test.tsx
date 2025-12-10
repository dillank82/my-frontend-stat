import { CircularPercentage, type CircularPercentageProps } from "../CircularPercentage/CircularPercentage"
import '@testing-library/jest-dom'
import { render } from "@testing-library/react"
import { CircularPercentageWrapper, type CircularPercentageWrapperProps } from "./CircularPercentageWrapper"
import { SolvedTaskPercentageDisplay } from "../SolvedTaskPercentageDisplay/SolvedTaskPercentageDisplay"
import { useCurrentSite } from "../../../hooks/useCurrentSite/useCurrentSite"
import { useCalculateTotalTasks } from "../../../hooks/useCalculateTotalTasks/useCalculateTotalTasks"
import type { tasksApiType } from "../../api/tasksApi"

jest.mock('../CircularPercentage/CircularPercentage', () => ({
    CircularPercentage: jest.fn((props: CircularPercentageProps) => <div data-testid='CircularPercentage'>{props.children}</div>)
}))
jest.mock('../SolvedTaskPercentageDisplay/SolvedTaskPercentageDisplay', () => ({
    SolvedTaskPercentageDisplay: jest.fn(({percent}) => <div>Percentage: {percent}</div>)
}))
jest.mock('../../../hooks/useCurrentSite/useCurrentSite', () => ({
    useCurrentSite: jest.fn()
}))
jest.mock('../../../hooks/useCalculateTotalTasks/useCalculateTotalTasks', () => ({
    useCalculateTotalTasks: jest.fn()
}))

const mockUseCurrentSite = useCurrentSite as jest.Mock
const mockUseCalculateTotalTasks = useCalculateTotalTasks as jest.Mock

describe('CircularPercentageWrapper', () => {
    beforeEach(() => {
        jest.clearAllMocks()

        mockUseCurrentSite.mockReturnValue(undefined)
        mockUseCalculateTotalTasks.mockReturnValue({
            solved: 15,
            all: 30
        })
    })
    test('должен корректно высчитывать процент решённых задач, округлять его до сотых и передавать пропсы дочерним компонентам', () => {
        mockUseCurrentSite.mockReturnValue({
            solved: 2,
            failed: 1
        } as tasksApiType)
        const expectedProps = {
            radius: 1,
            strokeWidth: 2,
            backgroundColor: '#333',
            progressColor: '#444',
            glow: false
        } as CircularPercentageWrapperProps
        const expectedPercent = 66.67
        render(<CircularPercentageWrapper {...expectedProps}/>)

        expect(CircularPercentage).toHaveBeenCalledTimes(1)
        expect(CircularPercentage).toHaveBeenCalledWith(
            expect.objectContaining({
                ...expectedProps, percent: expectedPercent
            }), 
            undefined
        )

        expect(SolvedTaskPercentageDisplay).toHaveBeenCalledTimes(1)
        expect(SolvedTaskPercentageDisplay).toHaveBeenCalledWith(
            expect.objectContaining({
                percent: expectedPercent
            }), 
            undefined
        )
    })
    test('должен принимать отсутствующие значения за 0', () => {
        mockUseCurrentSite.mockReturnValue({
            solved: 2
        } as tasksApiType)
        render(<CircularPercentageWrapper />)
        expect(CircularPercentage).toHaveBeenCalledTimes(1)
        expect(CircularPercentage).toHaveBeenCalledWith(
            expect.objectContaining({
                percent: 100
            }), 
            undefined
        )
    })
    test('должен корректно считать общий процент, если текущий сайт не передан', () => {
        mockUseCalculateTotalTasks.mockReturnValue({
            solved: 3,
            all: 4
        })
        render(<CircularPercentageWrapper />)
        expect(CircularPercentage).toHaveBeenCalledTimes(1)
        expect(CircularPercentage).toHaveBeenCalledWith(
            expect.objectContaining({
                percent: 75
            }), 
            undefined
        )
    })
    test('должен исключать деление на 0, возвращая 0 как результат', () => {
        mockUseCalculateTotalTasks.mockReturnValue({
            all: 0
        })
        render(<CircularPercentageWrapper />)
        expect(CircularPercentage).toHaveBeenCalledTimes(1)
        expect(CircularPercentage).toHaveBeenCalledWith(
            expect.objectContaining({
                percent: 0
            }), 
            undefined
        )
    })
})