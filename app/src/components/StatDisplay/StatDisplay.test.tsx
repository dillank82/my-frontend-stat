import { render, screen } from "@testing-library/react"
import '@testing-library/jest-dom'
import { StatDisplay } from "./StatDisplay"

describe('StatDisplay', () => {
    test('должен отображать переданный текст и переданное значение', ()=>{
        const text = 'test text'
        const value = 1
        render(<StatDisplay text={text} value={value}/>)
        const textDisplay = screen.getByText(text+':')
        const valueDisplay = screen.getByText(value)
        expect(textDisplay).toBeInTheDocument()
        expect(valueDisplay).toBeInTheDocument()
    })
    test('должен правильно создавать имя класса, отвечающего за варианты отображения', ()=>{
        render(<StatDisplay text="doesn't matter" value={2} variant={undefined}/>)
        const basicDisplay = screen.getByText(2)
        const basicContainer = basicDisplay.parentElement
        const basicWrapper = basicContainer?.parentElement
        expect(basicWrapper).toHaveAttribute('class', 'stat-display--basic')

        render(<StatDisplay text="doesn't matter" value={3} variant='small' />)
        const smallDisplay = screen.getByText(3)
        const smallContainer = smallDisplay.parentElement
        const smallWrapper = smallContainer?.parentElement
        expect(smallWrapper).toHaveAttribute('class', 'stat-display--small')
    })
})