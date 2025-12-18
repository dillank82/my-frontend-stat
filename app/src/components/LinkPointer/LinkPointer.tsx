import { DirectionalArrow } from "../DirectionalArrow/DirectionalArrow"
import './LinkPointer.css'

export const LinkPointer = ({ isVisible }: {isVisible: boolean}) => {
    const opacity = isVisible ? 0.8 : 0
    return (
        <div className="link-pointer-container" style={{ opacity }}>
            <span>LINK</span>
            <DirectionalArrow  direction="down"/>
        </div>
    )
}