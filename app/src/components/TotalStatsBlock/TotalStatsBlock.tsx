import type { ComponentType, ReactElement } from "react"
import './TotalStatsBlock.css'

export interface StatFieldConfig {
    id: string,
    component: ComponentType<unknown>,
    props?: Record<string, unknown>
}
export interface TotalStatsBlockProps {
    statFields: StatFieldConfig[]
}

export const TotalStatsBlock = ({ statFields }: TotalStatsBlockProps): ReactElement => {

    return (
        <>
            <div className="total-stats">
                {
                    statFields.map((field) => (
                        <div className="stat-field" key={field.id}>
                            <field.component {...field.props} />
                        </div>
                    ))
                }
            </div>
        </>
    )
}