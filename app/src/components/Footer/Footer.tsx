import type { ReactElement } from "react";
import './Footer.css'
import { FillingDots } from "../FillingDots/FillingDots";

interface FooterProps {
    portfolioLink: string
}

export const Footer = ({ portfolioLink }: FooterProps): ReactElement => {

    return (
        <>
            <footer>
                <span>my portfolio: <a href={portfolioLink}>{portfolioLink}</a></span>
                <FillingDots />
                <FillingDots />
            </footer>
        </>
    )
}