import { render } from "@testing-library/react"
import { CircularPercentageWrapper, type CircularPercentageWrapperProps } from "../CircularPercentageWrapper/CircularPercentageWrapper"
import { DetailedTasksStatBlock } from "./DetailedTasksStatBlock"
import { detailedStatBlockConfig } from "../../../config/siteSettings"

jest.mock('../CurrentSiteSelector/CurrentSiteSelector', () => ({
    CurrentSiteSelector: jest.fn(() => <div>Mock CurrentSiteSelector</div>)
}))
jest.mock('../SolvedFailedTasksWrapper/SolvedFailedTasksWrapper', () => ({
    SolvedFailedTasksWrapper: jest.fn(() => <div>Mock SolvedFailedTasksWrapper</div>)
}))
jest.mock('../CircularPercentageWrapper/CircularPercentageWrapper', () => ({
    CircularPercentageWrapper: jest.fn((props: CircularPercentageWrapperProps) => <div data-testid='CircularPercentageWrapper'>{Object.entries(props).map(e => e[0] + ':' + e[1])}</div>)
}))

describe('CircularPercentageWrapper', () => {
    test('должен корректно передавать пропсы в CircularPercentageWrapper', () => {
        const expextedProps = detailedStatBlockConfig.circularPercentageWrapperProps

        render(<DetailedTasksStatBlock />)
        expect(CircularPercentageWrapper).toHaveBeenCalledWith(expextedProps, undefined)
    })
})

