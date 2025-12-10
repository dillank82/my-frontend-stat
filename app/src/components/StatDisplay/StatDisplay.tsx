import type { ReactElement } from "react";
import './StatDisplay.css'
import { FillingDots } from "../FillingDots/FillingDots";

export interface StatDisplayProps {
    variant?: 'small'
    text: string,
    value: number
}

export const StatDisplay = ({ variant, text, value }: StatDisplayProps): ReactElement => {

    const displayClass = 'stat-display' + (variant ? `--${variant}` : '--basic')

    return (
        <>
            <div className={displayClass}>
                <div className='stat-display-container' >
                    <span className="stat-display-heading">{text}:</span>
                    <FillingDots />
                    <span className="stat-display-value">{value}</span>
                </div>
            </div>
        </>
    )
}