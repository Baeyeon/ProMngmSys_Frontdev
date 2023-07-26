import {createStore} from "vuex"

export default createStore({
    state: {
        count: 0,
    },
    mutations: {
        SET_COUNT: (state, count) => {
            state.count = count;
        },
    },
    actions: {
        setCount({ commit }, str) {
            setTimeout(function () {
                commit("SET_COUNT", str + new Date().getTime());
            }, 3000);
        },
    },
    getters: {},
    modules: {},
})