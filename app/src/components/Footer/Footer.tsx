import { useRef, type ReactElement } from "react";
import './Footer.css'
import { FillingDots } from "../FillingDots/FillingDots";
import { useIsElementVisible } from "../../hooks/useIsElementVisible/useIsElementVisible";
import { LinkPointer } from "../LinkPointer/LinkPointer";

interface FooterProps {
    portfolioLink: string
}

export const Footer = ({ portfolioLink }: FooterProps): ReactElement => {
    const ref = useRef(null)
    const isVisible = useIsElementVisible({ref, threshold: 0.01})

    return (
        <>
            <footer>
                <LinkPointer isVisible={isVisible}/>

                <span ref={ref}>my portfolio: <a href={portfolioLink}>{portfolioLink}</a></span>
                <FillingDots />
                <FillingDots />
            </footer>
        </>
    )
}