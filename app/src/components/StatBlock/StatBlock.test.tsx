import { render } from "@testing-library/react"
import { StatBlock } from "./StatBlock"
import * as TotalStatsBlockMock from "../TotalStatsBlock/TotalStatsBlock"

jest.mock('../../config/siteSettings', () => {
    const MOCKED_COMPONENTS = [
        { id: 'a', component: () => { return <div>Mocked Component A</div> } },
        { id: 'b', component: () => { return <div>Mocked Component B</div> } },
    ]

    return {
        statBlockConfig: {
            totalStatBlockComponentsToRender: MOCKED_COMPONENTS
        }
    }
})
jest.mock('../TotalStatsBlock/TotalStatsBlock', () => ({
    TotalStatsBlock: jest.fn((statFields: unknown) => <div>{JSON.stringify(statFields)}</div>)
}))
jest.mock('../../features/tasks/DetailedTasksStatBlock/DetailedTasksStatBlock', () => ({
    DetailedTasksStatBlock: jest.fn(() => <div>Mocked DetailedTasksStatBlock</div>)
}))



describe('StatBlock', () => {
    test('должен передавать конфиг в TotalStatBlock', () => {
        render(<StatBlock />)
        expect(TotalStatsBlockMock.TotalStatsBlock).toHaveBeenCalledTimes(1)
        expect(TotalStatsBlockMock.TotalStatsBlock).toHaveBeenCalledWith(
            {
                statFields: [
                    { id: 'a', component: expect.any(Function) },
                    { id: 'b', component: expect.any(Function) },
                ]
            },
            undefined
        )
    })
})