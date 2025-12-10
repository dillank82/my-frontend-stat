import type { ReactElement } from "react";
import './FillingDots.css'

export const FillingDots = (): ReactElement => {

    return (
        <>  
            {/* Для правильного отображения родитель должен быть flex */}
            <span className="filling-dots"></span>
        </>
    )
}