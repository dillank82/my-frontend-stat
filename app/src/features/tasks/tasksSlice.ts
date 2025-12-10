import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface SiteStats {
    id: string,
    name: string,
    solved: number,
    failed: number,
}

export interface tasksStats {
    sites: Record<string, SiteStats>,
    siteIds: string[]
    currentSiteIndex: number
}

const initialState: tasksStats = {
    sites: {
        'exercism': {
            id: 'exercism',
            name: 'Exercism',
            solved: 1,
            failed: 1,
        }
    },
    siteIds: ['', 'exercism'],
    currentSiteIndex: 0
}

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addSolvedTasks: (state, action: PayloadAction<{ id: string, number: number }>) => {
            state.sites[action.payload.id].solved += action.payload.number
        },
        addFailedTasks: (state, action: PayloadAction<{ id: string, number: number }>) => {
            state.sites[action.payload.id].failed += action.payload.number
        },
        setSite: (state, action: PayloadAction<{ id: string, name: string, solved?: number, failed?: number }>) => {
            const { id, name, solved, failed } = action.payload
            if (!state.sites[id]) {
                state.sites[id] = { id, name, solved: solved || 0, failed: failed || 0 }
                state.siteIds = state.siteIds.concat(id)
            }
            if (state.sites[id]) {
                state.sites[id].solved = solved || 0
                state.sites[id].failed = failed || 0
            }
        },
        nextCurrentSite: (state, action: { type: string, payload: number }) => {
            const sitesCount = action.payload
            if (state.currentSiteIndex + 1 === (sitesCount + 1)) {
                state.currentSiteIndex = 0
            } else {
                state.currentSiteIndex++
            }
        },
        prevCurrentSite: (state, action: { type: string, payload: number }) => {
            const sitesCount = action.payload
            if (state.currentSiteIndex === 0) {
                state.currentSiteIndex = sitesCount
            } else {
                state.currentSiteIndex--
            }
        },
    }
})

export const { addSolvedTasks, addFailedTasks, setSite, nextCurrentSite, prevCurrentSite } = tasksSlice.actions

export default tasksSlice.reducer