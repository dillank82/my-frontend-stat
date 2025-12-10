import '@testing-library/jest-dom'
import { Hours } from './Hours'
import { render, screen } from '@testing-library/react'
import * as api from '../../api/timeApi'
jest.mock('../../api/timeApi', () => ({
    ...jest.requireActual('../../api/timeApi'),
    useGetTimeQuery: jest.fn()
}))

const useGetTimeQuery = api.useGetTimeQuery as jest.Mock

describe('Hours', () => {
    beforeEach(() => {
        jest.clearAllMocks()
        useGetTimeQuery.mockReturnValue({
            data: { minutes: 316 }
        })
    })

    it('должен правильно отображать количество часов, округляя до сотых', () => {
        render(<Hours />)
        const hours = screen.getByText('5.27ч')
        expect(hours).toBeInTheDocument()
    })
    it('должен отображать 0 часов в случае отсутствия данных', () => {
        useGetTimeQuery.mockReturnValue({
            data: {}
        })
        render(<Hours />)
        const hours = screen.getByText('0ч')
        expect(hours).toBeInTheDocument()
    })
    it('должен отображать "Loading..." вместо информации о времени во время загрузки', () => {
            useGetTimeQuery.mockReturnValue({
                data: { minutes: 60 },
                isLoading: true
            })
            render(<Hours />)
            const hours = screen.queryByText('1ч')
            expect (hours).not.toBeInTheDocument()
            const isLoading = screen.getByText('Loading...')
            expect (isLoading).toBeInTheDocument()
        })
        it('должен отображать "Failed to fetch" вместо информации о времени при ошибке', () => {
            useGetTimeQuery.mockReturnValue({
                data: { minutes: 60 },
                error: true
            })
            render(<Hours />)
            const hours = screen.queryByText('1ч')
            expect (hours).not.toBeInTheDocument()
            const isLoading = screen.getByText('Failed to fetch')
            expect (isLoading).toBeInTheDocument()
        })
})