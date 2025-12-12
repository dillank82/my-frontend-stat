import { useEffect, useState, type RefObject } from "react"

interface useIsElementVisibleProps {
    ref: RefObject<HTMLElement | null>
    threshold: number
}

export const useIsElementVisible = ({ ref, threshold }: useIsElementVisibleProps) => {
    const [isVisible, setIsVisible] = useState(true)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0]) {
                    const isIntersecting = entries[0].isIntersecting
                    setIsVisible(!isIntersecting)
                }
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: threshold
            }
        )
        if (ref.current) {
            observer.observe(ref.current)
        }
        
        return () => {
            if (ref.current) {
                observer.unobserve(ref.current)
            }
        }
    }, [ref, threshold])

    return isVisible
}