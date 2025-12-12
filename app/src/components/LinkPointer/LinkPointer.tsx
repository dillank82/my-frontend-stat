export const LinkPointer = (isVisible: boolean) => {
    return (
        <>
            {isVisible && 
                <div>
                    <span>LINK</span>
                    <div className="arrow-down"></div>
                </div>
            }
        </>
       
    )
}