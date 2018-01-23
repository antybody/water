/**
 *  三条红线的数据接口
 */
import * as API from '../api/api'
const state = {
    tablists:[],
    newlists:[]
}

const mutations = {
    getTabLists (state, payload) {
      state.tablists = payload.res
    },
    getNewLists (state,payload) {
        state.newlists = payload.res
    }
}

const actions = {
    getTabLists({commit}){
        return new Promise((resolve,reject) =>{
            Vue.http.jsonp(API.HOME_TABLIST,{param:payload.year})
                .then(res => {
                    commit({
                        type: 'getTabLists',
                        res: res.body.results
                    })
                resolve(res);
            }).catch(err => {
                console.log(err);
                reject(err);
            })
       })
    },
    getNewLists({commit}){
        return new Promise((resolve,reject) =>{
            Vue.http.jsonp(API.HOME_NEWLIST)
                .then(res => {
                    commit({
                        type: 'getNewLists',
                        res: res.body.results
                    })
                resolve(res);
            }).catch(err => {
                console.log(err);
                reject(err);
            })
       })
    }
}

export default {
    state,
    mutations,
    actions
}