import { render, screen } from "@testing-library/react"
import { portfolioLink } from "../../config/siteSettings"
import '@testing-library/jest-dom'

jest.mock('../StatBlock/StatBlock', () => ({
    StatBlock: () => <div data-testid="mock-stat-block">Mocked StatBlock</div>
}))

import { App } from "./App"

describe('App', () => {
    test('должен рендерить Header, Footer и StatBlock', () => {
        render(<App />)

        const header = screen.getByText('my frontend stats')
        expect(header).toBeInTheDocument()

        const footerLink = screen.getByRole('link', { name: `${portfolioLink}` })
        const footerText = footerLink.parentElement
        const footer = footerText?.parentElement
        expect(footer).toBeInTheDocument()

        const statBlock = screen.getByTestId('mock-stat-block')
        expect(statBlock).toBeInTheDocument()
    })
})