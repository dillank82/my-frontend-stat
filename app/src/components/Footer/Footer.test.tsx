import { render, screen } from "@testing-library/react"
import { Footer } from "./Footer"
import * as MockLinkPointer from '../LinkPointer/LinkPointer'
import * as MockFillingDots from '../FillingDots/FillingDots'
import '@testing-library/jest-dom'
import { useIsElementVisible } from "../../hooks/useIsElementVisible/useIsElementVisible"

jest.mock('../LinkPointer/LinkPointer', () => ({
    LinkPointer: jest.fn(({ isVisible }: { isVisible: boolean }) => <div>{isVisible} LinkPointer</div>)
}))
jest.mock('../FillingDots/FillingDots', () => ({
    FillingDots: jest.fn(() => <div>MockedFillingDots</div>)
}))
jest.mock('../../hooks/useIsElementVisible/useIsElementVisible', () => ({
    useIsElementVisible: jest.fn()
}))

const mockUseIsElementVisible = useIsElementVisible as jest.Mock
mockUseIsElementVisible.mockReturnValue(true)

describe('Footer', () => {
    test('должен отображать функционирующую ссылку с нужным текстом', () => {
        const url = 'https://github.com/dillank82'

        render(<Footer portfolioLink={url}/>)
        const link = screen.getByRole('link', { name: url })
        expect(link).toBeInTheDocument()
        expect(link).toHaveAttribute('href', url)
    })
    test('должен передавать параметр видимости в LinkPointer', () => {
        expect(MockLinkPointer.LinkPointer).toHaveBeenCalledTimes(2)
        expect(MockLinkPointer.LinkPointer).toHaveBeenCalledWith({ isVisible: true }, undefined)
    })
    test('должен рендерить декоративные компоненты', () => {
        expect(MockFillingDots.FillingDots).toHaveBeenCalledTimes(2)
    })
})