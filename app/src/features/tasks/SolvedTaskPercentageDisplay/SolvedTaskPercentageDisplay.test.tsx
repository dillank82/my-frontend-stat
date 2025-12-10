import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react"
import { SolvedTaskPercentageDisplay } from "./SolvedTaskPercentageDisplay"

describe('SolvedTaskPercentageDisplay', () => {
    it('должен корректно отображать переданные проценты', () => {
        const percent = 19
        render(<SolvedTaskPercentageDisplay percent={percent}/>)
        const display = screen.getByText(percent+'%')
        expect(display).toBeInTheDocument()
    })
    it('должен корректно обрабатывать 0', () => {
        const percent = 0
        render(<SolvedTaskPercentageDisplay percent={percent}/>)
        const display = screen.getByText(percent+'%')
        expect(display).toBeInTheDocument()
    })
    it('должен отображать 0% при отсутствии данных', () => {
        const percent = undefined as unknown as number
        render(<SolvedTaskPercentageDisplay percent={percent}/>)
        const display = screen.getByText('0%')
        expect(display).toBeInTheDocument()
    })
})