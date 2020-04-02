/**
 * 标签栏
 */
const state = {
    visitedViews: [],
    cachedViews: []
}

const mutations = {
    ADD_VISITED_VIEW: (state, view) => {
        if (state.visitedViews.some(v => v.path === view.path)) return
        state.visitedViews.push(
            Object.assign({}, view, {
                title: view.meta.title || 'no-name'
            })
        )
    },
    DEL_VISITED_VIEW: (state, viewName) => {
        for (const [i, v] of state.visitedViews.entries()) {
            if (v.name === viewName) {
                state.visitedViews.splice(i, 1)
                break
            }
        }
    },
    DEL_OTHERS_VISITED_VIEW: (state, viewName) => {
        let view = state.visitedViews.filter(view => {
            return view.name === viewName
        })
        console.log(view)
        state.visitedViews = view;
    }
}

const actions = {
    addVisitedView({ commit }, view) {
        commit('ADD_VISITED_VIEW', view)
    },
    delVisitedView({ commit, state }, view) {
        return new Promise(resolve => {
            commit('DEL_VISITED_VIEW', view)
            resolve([...state.visitedViews])
        })
    },
    delOthersVisitedView({ commit, state }, viewName) {
        return new Promise(resolve => {
            commit('DEL_OTHERS_VISITED_VIEW', viewName)
            resolve([...state.visitedViews])
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}