import { render, screen } from "@testing-library/react";
import { Projects } from "./Projects";
import type { StatDisplayProps } from "../../components/StatDisplay/StatDisplay";
import * as api from '../api/projectsApi'
import '@testing-library/jest-dom'
jest.mock('../../components/StatDisplay/StatDisplay', () => ({
    StatDisplay: jest.fn(({ text, value }: StatDisplayProps) => <div>{text}: {value}</div>)
}))
jest.mock('../api/projectsApi', () => ({
    ...jest.requireActual('../api/projectsApi'),
    useGetProjectsQuery: jest.fn()
}))

const mockUseGetProjectsQuery = api.useGetProjectsQuery as jest.Mock

describe('Projects', () => {
    beforeEach(() => {
        jest.clearAllMocks()
        mockUseGetProjectsQuery.mockReturnValue({
            data: { projectsCount: 10 }
        })
    })

    it('должен правильно передавать количество проектов в StatDisplay', () => {
        render(<Projects />)
        const projects = screen.getByText('Проектов завершено: 10')
        expect (projects).toBeInTheDocument()
    })
    it('должен передавать 0 при отсутствии данных', () => {
        mockUseGetProjectsQuery.mockReturnValue({
            data: {}
        })
        render(<Projects />)
        const projects = screen.getByText('Проектов завершено: 0')
        expect (projects).toBeInTheDocument()
    })
    it('должен отображать "Loading..." вместо информации о проектах во время загрузки', () => {
        mockUseGetProjectsQuery.mockReturnValue({
            data: { projectsCount: 10 },
            isLoading: true
        })
        render(<Projects />)
        const projects = screen.queryByText('Проектов завершено: 10')
        expect (projects).not.toBeInTheDocument()
        const isLoading = screen.getByText('Loading...')
        expect (isLoading).toBeInTheDocument()
    })
    it('должен отображать "Failed to fetch" вместо информации о проектах при ошибке', () => {
        mockUseGetProjectsQuery.mockReturnValue({
            data: { projectsCount: 10 },
            error: true
        })
        render(<Projects />)
        const projects = screen.queryByText('Проектов завершено: 10')
        expect (projects).not.toBeInTheDocument()
        const isLoading = screen.getByText('Failed to fetch')
        expect (isLoading).toBeInTheDocument()
    })
})