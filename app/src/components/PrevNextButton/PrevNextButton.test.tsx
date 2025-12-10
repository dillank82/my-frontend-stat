import { render, screen } from "@testing-library/react"
import { PrevNextButton } from "./PrevNextButton"
import '@testing-library/jest-dom'
import userEvent from "@testing-library/user-event"

describe('PrevNextButton', () => {
    test('должен иметь правильную иконку для указанного направления', () => {
        render(<PrevNextButton direction="prev" onClick={() => {}}/>)
        const prevButton = screen.getByRole('button', { name: '<' })
        expect(prevButton).toBeInTheDocument()
        
        render(<PrevNextButton direction="next" onClick={() => {}}/>)
        const nextButton = screen.getByRole('button', { name: '>' })
        expect(nextButton).toBeInTheDocument()
    })

    test('должен выполнять переданную функцию при нажатии на кнопку', async() => {
        const testNumber = 2
        let page = testNumber

        const user = userEvent.setup()

        render(<PrevNextButton direction="prev" onClick={() => {page--}}/>)
        const prevButton = screen.getByRole('button', { name: '<' })
        await user.click(prevButton)
        expect(page).toBe(testNumber-1)
    })
})