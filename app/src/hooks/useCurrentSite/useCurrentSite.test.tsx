import { renderHook } from '@testing-library/react'
import { useCurrentSite } from "./useCurrentSite.ts"
import { configureStore } from 'redux-mock-store'
import { Provider } from "react-redux"
import type { RootState } from "../../store/index.ts"
import type { ReactNode } from "react"
import * as api from '../../features/api/tasksApi'
jest.mock('../../features/api/tasksApi', () => ({
    ...jest.requireActual('../../features/api/tasksApi'),
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

describe('useCurrentSite', () => {
    let store: MockStore
    beforeEach(() => {
        const initialState: RootState = {
            tasks: { currentSiteIndex: 1 }
        } as RootState
        store = mockStore(initialState)
        store.dispatch = mockDispatch

        jest.clearAllMocks()
        mockUseGetAllSitesQuery.mockReturnValue({
            data: [
                {name: 'first', orderIndex: 1},
                {name: 'second', orderIndex: 2}
            ]
        })
    })

    it('должен возвращать правильный сайт на основе индекса', () => {
        const wrapper = makeWrapper(store)
        const { result } = renderHook(() => useCurrentSite(), { wrapper })
        expect(result.current?.name).toBe('first')
    })
    it('должен выбрасывать ошибку, если индекс выходит за границы', () => {
        const testIndex = -1

        const initialStateWithError = {
            tasks: {
                currentSiteIndex: testIndex
            }
        } as RootState
        const errorStore = mockStore(initialStateWithError)
        const wrapper = ({ children }: { children: ReactNode }) => (
            <Provider store={errorStore}>
                {children}
            </Provider>
        )

        expect(() =>
            renderHook(() => useCurrentSite(), { wrapper })
        ).toThrow(`[useCurrentSite] Index out of bounds: ${testIndex}`);
    })
    it('должен возвращать undefined, если сайт не найден', () => {
        mockUseGetAllSitesQuery.mockReturnValue([{}])
        const wrapper = makeWrapper(store)
        const { result } = renderHook(() => useCurrentSite(), { wrapper })
        expect(result.current).toBe(undefined)
    })
})