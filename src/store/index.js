import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

const store=new Vuex.Store({
    state:{
        isShowLoading:false
    },
    mutations:{
        chagneLoading(state,data){
            if(data){
                state.isShowLoading=data;
            }else{
                setTimeout(()=>{
                    state.isShowLoading=data;
                },3000)
            }
           

        }
    }
})

export default store