import { render, screen } from "@testing-library/react"
import '@testing-library/jest-dom'
import { TotalStatsBlock, type StatFieldConfig } from "./TotalStatsBlock"

describe('TotalStatBlock', () => {
    test('должен рендерить компоненты в соответствии с переданной конфигурацией', () => {
        const Component = jest.fn((props) => <div>{props.text}</div>)
        const config: StatFieldConfig[] = [{
            id: 'test_id',
            component: Component,
            props: {'text': 'test'}
        }]
        render(<TotalStatsBlock statFields={config}/>)
        const testComponent = screen.getByText('test')
        expect(testComponent).toBeInTheDocument()
    })
})