import { render, screen } from "@testing-library/react"
import { Footer } from "./Footer"
import '@testing-library/jest-dom'

describe('Footer', () => {
    test('должен отображать функционирующую ссылку с нужным текстом', () => {
        const url = 'https://github.com/dillank82'

        render(<Footer portfolioLink={url}/>)
        const link = screen.getByRole('link', { name: url })
        expect(link).toBeInTheDocument()
        expect(link).toHaveAttribute('href', url)
    })
})