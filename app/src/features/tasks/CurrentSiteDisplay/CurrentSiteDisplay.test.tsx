import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react"
import { CurrentSiteDisplay } from './CurrentSiteDisplay'
import { useCurrentSite } from '../../../hooks/useCurrentSite/useCurrentSite'

jest.mock('../../../hooks/useCurrentSite/useCurrentSite', () => ({
    useCurrentSite: jest.fn()
}))
const mockUseCurrentSite = useCurrentSite as jest.Mock

describe('CurrentSiteDisplay', () => {
    const testName = 'testSiteName'
    beforeEach(() => {
        jest.clearAllMocks()

        mockUseCurrentSite.mockReturnValue({ name: testName })
    })
    it('должен корректно отображать имя текущего сайта', () => {
        render(<CurrentSiteDisplay />)
        const display = screen.getByText(testName)
        expect(display).toBeInTheDocument()
    })
    it('должен отображать "All sites" при отсутствии данных о сайте', () => {
        mockUseCurrentSite.mockReturnValue(undefined)
        render(<CurrentSiteDisplay />)
        const display = screen.getByText('All sites')
        expect(display).toBeInTheDocument()
    })
})