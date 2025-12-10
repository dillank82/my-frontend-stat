import { renderHook } from "@testing-library/react"
import { useCalculateTotalTasks } from "./useCalculateTotalTasks"
import * as api from '../../features/api/tasksApi'
jest.mock('../../features/api/tasksApi', () => ({
    ...jest.requireActual('../../features/api/tasksApi'),
    useGetAllSitesQuery: jest.fn()
}))

const mockUseGetAllSitesQuery = api.useGetAllSitesQuery as jest.Mock

describe('useCalculateTotalTasks', () => {
    beforeEach(() => {
        jest.clearAllMocks()
        mockUseGetAllSitesQuery.mockReturnValue({
            data: [
                {solved: 250, failed: 500},
                {solved: 5, failed: 245}
            ]
        })
    })
    it('должен возвращать правильную сумму полученных значений', () => {
        const { result } = renderHook(() => useCalculateTotalTasks())
        expect(result.current.solved).toBe(255)
        expect(result.current.failed).toBe(745)
        expect(result.current.all).toBe(1000)
    })
    it('должен работать с нулевыми значениями', () => {
        mockUseGetAllSitesQuery.mockReturnValue({
            data: [
                {solved: 0, failed: 0},
                {solved: 0, failed: 0}
            ]
        })
        const { result } = renderHook(() => useCalculateTotalTasks())
        expect(result.current.solved).toBe(0)
        expect(result.current.failed).toBe(0)
        expect(result.current.all).toBe(0)
    })
    it('должен возвращать нулевые значения, если не было получено данных о сайтах', () => {
        mockUseGetAllSitesQuery.mockReturnValue({ data: [] })
        const { result } = renderHook(() => useCalculateTotalTasks())
        expect(result.current.solved).toBe(0)
        expect(result.current.failed).toBe(0)
        expect(result.current.all).toBe(0)
    })
    it('должен обрабатывать отсутствующее поле как 0', () => {
        mockUseGetAllSitesQuery.mockReturnValue({
            data: [
                {failed: 22},
                {solved: 23}
            ]
        })
        const { result } = renderHook(() => useCalculateTotalTasks())
        expect(result.current.solved).toBe(23)
        expect(result.current.failed).toBe(22)
        expect(result.current.all).toBe(45)
    })
})

