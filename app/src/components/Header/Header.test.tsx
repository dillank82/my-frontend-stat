import { render, screen } from "@testing-library/react"
import '@testing-library/jest-dom'
import { Header } from "./Header"

describe('Header', () => {
    test('должен рендериться с переданным текстом', () => {
        const text = 'Header test'

        render(<Header text={text}/>)
        const header = screen.getByText(text)
        expect(header).toBeInTheDocument()
    })
})