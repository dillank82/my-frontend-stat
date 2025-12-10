import type { ReactElement } from "react"
import type { HexColor } from "../../../interfaces/types"
import './CircularPercentage.css'

export interface CircularPercentageProps {
    percent: number
    radius?: number
    strokeWidth?: number
    backgroundColor?: HexColor
    progressColor?: HexColor
    children?: ReactElement
    glow?: boolean
    glowColor?: HexColor
    glowBlur?: number
}

export const CircularPercentage = ({
    percent,
    radius = 75,
    strokeWidth = 2,
    backgroundColor = '#ffffffff',
    progressColor = '#00fff2ff',
    children,
    glow,
    glowColor = '#ffffffff',
    glowBlur = 5,
}: CircularPercentageProps): ReactElement => {

    const viewBoxSize = radius * 2 + strokeWidth
    const center = radius + strokeWidth / 2

    const circumferenceLength = 2 * Math.PI * radius

    const offset = circumferenceLength - (percent / 100) * circumferenceLength

    return (
        <>
            <div className="circular-percentage-container">
                <svg
                    width={viewBoxSize}
                    height={viewBoxSize}
                    viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
                >
                    {glow &&
                        <defs>
                            <filter id="glow" x='-50%' y='-50%' width='200%' height='200%'>
                                <feGaussianBlur in='SourceGraphic' stdDeviation={glowBlur} result="blur" />
                                <feFlood floodColor={glowColor} floodOpacity={1} result="glowColor" />
                                <feComposite in='glowColor' in2='blur' operator='in' result="coloredBlur" />
                                <feMerge>
                                    <feMergeNode in='coloredBlur' />
                                    <feMergeNode in='SourceGraphic' />
                                </feMerge>
                            </filter>
                        </defs>
                    }

                    <circle
                        stroke={backgroundColor}
                        strokeWidth={strokeWidth}
                        fill="none"
                        r={radius}
                        cx={center}
                        cy={center}
                    />
                    <circle
                        stroke={progressColor}
                        strokeWidth={strokeWidth}
                        fill="none"
                        r={radius}
                        cx={center}
                        cy={center}
                        strokeDasharray={circumferenceLength}
                        strokeDashoffset={offset}
                        transform={`rotate(90, ${center}, ${center})`}
                        filter='url(#glow)'
                    />
                </svg>
                {children}
            </div>
        </>
    )
}