import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        isShowLoading: false
    },
    mutations: {
        chagneLoading(state, data) {
            state.isShowLoading = data;
        }
    }
})

export default store