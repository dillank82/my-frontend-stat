export const DirectionalArrow = ({ direction }: { direction: 'up' | 'down' | 'left' | 'right' }) => {
    
    let transform = ""
    
    if (direction === 'up') transform = "rotate(-90deg)"
    if (direction === 'down') transform = "rotate(90deg)"
    if (direction === 'left') transform = "rotate(180deg)"

    return (
        <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            style={{ transform: transform }}
        >
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 19 19 12 12 5"></polyline>
        </svg>
    )
}