import type { ReactElement } from "react"
import './PrevNextButton.css'

interface PrevNextButtonProps {
    direction: 'prev' | 'next',
    onClick: () => void
}

export const PrevNextButton = ({ direction, onClick }: PrevNextButtonProps): ReactElement => {

    const icon: string = (direction == 'next') ? '>' : '<'

    return (
        <>
            <button className="prev-next-btn" onClick={() => { onClick() }}>
                {icon}
            </button>
        </>
    )
}