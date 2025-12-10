import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react"
import { CircularPercentage, type CircularPercentageProps } from "./CircularPercentage"

const defaultProps: CircularPercentageProps = {
    percent: 25,
    radius: 50,
    strokeWidth: 5
}

describe('CircularPercentage', () => {
    it('должен корректно рендериться по переданным значениям', () => {
        const { container } = render(<CircularPercentage {...defaultProps}/>)
        const svg = container.querySelector('svg')
        const circles = container.querySelectorAll('circle')
        expect(svg).toBeInTheDocument()
        expect(svg).toHaveAttribute('width', '105')
        expect(svg).toHaveAttribute('height', '105')
        expect(circles).toHaveLength(2)
    })
    it('должен корректно отображать переданный процентаж', () => {
        const radius = 100
        const circumferenceLength = 2 * Math.PI * radius
        const expectedOffset = circumferenceLength - (0.25 * circumferenceLength)
        const { container } = render(<CircularPercentage {...defaultProps} radius={radius}/>)
        const circles = container.querySelectorAll('circle')
        const progressCircle = circles[circles.length-1]
        const actualOffset = parseFloat(progressCircle.getAttribute('stroke-dashoffset')!)
        expect(actualOffset).toBeCloseTo(expectedOffset)
    })
    it('должен корректно отображать переданные цвета', () => {
        const backgroundColor = '#A98307'
        const progressColor = '#6DAE81'
        const { container } = render(<CircularPercentage {...defaultProps} backgroundColor={backgroundColor} progressColor={progressColor}/>)
        const [backgroundCircle, progressCircle] = container.querySelectorAll('circle')
        expect(backgroundCircle).toHaveAttribute('stroke', backgroundColor)
        expect(progressCircle).toHaveAttribute('stroke', progressColor)
    })
    it('должен применять переданную ширину к обоим кругам', () => {
        const expectedWidth = 1
        const { container } = render(<CircularPercentage {...defaultProps} strokeWidth={expectedWidth}/>)
        const [backgroundCircle, progressCircle] = container.querySelectorAll('circle')
        expect(backgroundCircle).toHaveAttribute('stroke-width', expectedWidth.toString())
        expect(progressCircle).toHaveAttribute('stroke-width', expectedWidth.toString())
    })
    it('должен корректно применять эффект свечения', () => {
        const glowBlur = 30
        const glowColor = '#9A366B'
        const { container } = render(<CircularPercentage {...defaultProps} glow={true} glowBlur={glowBlur} glowColor={glowColor}/>)
        const blur = container.querySelector('feGaussianBlur')
        expect(blur).toBeInTheDocument()
        expect(blur).toHaveAttribute('stdDeviation', glowBlur.toString())
        const color = container.querySelector('feFlood')
        expect(color).toBeInTheDocument()
        expect(color).toHaveAttribute('flood-opacity', '1')
        expect(color).toHaveAttribute('flood-color', glowColor)
    })
    it('должен рендерить дочерний компонент', () => {
        const Component: React.ElementType = () => <button>Update</button>
        render(<CircularPercentage {...defaultProps}><Component /></CircularPercentage>)
        const child = screen.getByRole('button', { name: 'Update' })
        expect(child).toBeInTheDocument()
    })
})