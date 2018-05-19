import Vue from 'vue'
// import  * as api from '../api/api'
/**
 *  搜索框的几点说明：
 *  searchType 表示 当前搜索的是哪个接口
 *  1、初始化获取推荐查询信息
 *  2、根据查询条件获取查询信息，默认就8条，多了不显示
 */
const state = {
    searchLists: [],
    searchUrl:'',
    loading:false
}

const mutations = {
    getDefalutLists (state, payload) {
      state.searchLists = payload.res
    },
    getListByParams (state,payload) {
      state.searchLists = payload.res
    }
}

const actions ={
    getDefalutLists({commit},payload){
        switch(payload.param){
            case 'dbsqsh':
            commit({
                type: 'getDefalutLists',
                res: [{title:'测试',href:'/qshDetail/1',tag1:'测试',tag2:'测试',tag3:'测试'},
                {title:'测试',href:'/qshDetail/1',tag1:'测试',tag2:'测试',tag3:'测试'}]
            })
            state.searchUrl = '123';
            break;
            case 'sgnq':
            commit({
                type: 'getDefalutLists',
                res: [{title:'吴淞江',href:'/qshDetail/1',tag1:'测试',tag2:'测试',tag3:'测试'},
                {title:'吴淞江',href:'/qshDetail/1',tag1:'测试',tag2:'测试',tag3:'测试'}]
            })
            state.searchUrl = '';
            break;
        }
    },
    getListByParams({commit},payload){
        return new Promise((resolve,reject) =>{
        Vue.http.get(state.searchUrl,{param:payload.val})
            .then(res => {
                commit({
                    type: 'getListByParams',
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