import { DirectionalArrow } from "../DirectionalArrow/DirectionalArrow"

export const LinkPointer = ({ isVisible }: {isVisible: boolean}) => {
    return (
        <>
            {isVisible && 
                <div>
                    <span>LINK</span>
                    <DirectionalArrow  direction="down"/>
                </div>
            }
        </>
       
    )
}