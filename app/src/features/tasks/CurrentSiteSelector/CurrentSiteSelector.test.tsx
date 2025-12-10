import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import '@testing-library/user-event'
import type { ReactNode } from 'react'
import configureStore from 'redux-mock-store'
import type { RootState } from '../../../store'
import { CurrentSiteSelector } from './CurrentSiteSelector'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import * as api from '../../api/tasksApi'

jest.mock('../../../components/PrevNextButton/PrevNextButton', () => ({
    PrevNextButton: jest.fn(({ direction, onClick }) => <button onClick={onClick}>{direction}</button>)
}))
jest.mock('../CurrentSiteDisplay/CurrentSiteDisplay', () => ({
    CurrentSiteDisplay: jest.fn(() => <div>Mock CurrentSiteDisplay</div>)
}))
jest.mock('../../api/tasksApi', () => ({
    ...jest.requireActual('../../api/tasksApi'),
    useGetAllSitesQuery: jest.fn()
}))

const mockUseGetAllSitesQuery = api.useGetAllSitesQuery as jest.Mock

type MockStore = ReturnType<typeof mockStore>
const mockStore = configureStore<Partial<RootState>>([])
const makeWrapper = (store: MockStore) => {
    const wrapper = ({ children }: { children: ReactNode }) => (
        <Provider store={store}>
            {children}
        </Provider>
    )
    return wrapper
}
const mockDispatch = jest.fn()

describe('CurrentSiteDisplay', () => {
    let store: MockStore
    beforeEach(() => {
        const initialState: Partial<RootState> = {} as unknown as RootState
        store = mockStore(initialState)
        store.dispatch = mockDispatch

        jest.clearAllMocks()
        mockUseGetAllSitesQuery.mockReturnValue({ data: ['1'] })
    })

    test('должен передавать корректно функционирующие диспатчи в PrevNextButton, передавая длинну массива сайтов как payload', async () => {
        const user = userEvent.setup()
        const wrapper = makeWrapper(store)
        render(<CurrentSiteSelector />, { wrapper })

        const prev = screen.getByRole('button', { name: 'prev' })
        expect(prev).toBeInTheDocument()
        const next = screen.getByRole('button', { name: 'next' })
        expect(next).toBeInTheDocument()

        await user.click(next)
        expect(mockDispatch).toHaveBeenCalledTimes(1)
        expect(mockDispatch).toHaveBeenCalledWith({ type: 'tasks/nextCurrentSite', payload: 1 })
        await user.click(prev)
        expect(mockDispatch).toHaveBeenCalledTimes(2)
        expect(mockDispatch).toHaveBeenCalledWith({ type: 'tasks/prevCurrentSite', payload: 1 })
    })
    test('должен передавать в payload 0, если массив с сайтами не был получен', async () => {
        mockUseGetAllSitesQuery.mockReturnValue({})
        const user = userEvent.setup()
        const wrapper = makeWrapper(store)
        render(<CurrentSiteSelector />, { wrapper })

        const prev = screen.getByRole('button', { name: 'prev' })
        expect(prev).toBeInTheDocument()

        await user.click(prev)
        expect(mockDispatch).toHaveBeenCalledTimes(1)
        expect(mockDispatch).toHaveBeenCalledWith({ type: 'tasks/prevCurrentSite', payload: 0 })
    })
})
