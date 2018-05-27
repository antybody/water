import Vue from 'vue'
/**
 * 管理考核
 * 1、整体的环形图
 * 2、取水户数据信息
 * 3、水质评价数据信息
 */
const state = {
    qshList:[
        {txt:'异常站点',value:'10'},
        {txt:'正常站点',value:'20'},
        {txt:'站点总数',value:'30'}
     ],
    sydList:[
        {txt:'异常站点',value:'60'},
        {txt:'正常站点',value:'20'},
        {txt:'站点总数',value:'30'}
    ],
    sgnqList:[
        {txt:'异常站点',value:'20'},
        {txt:'正常站点',value:'20'},
        {txt:'站点总数',value:'30'}
    ],
    nowDate:''
}

const mutations = {
    getLists (state, payload) {
        state.qshList = payload.res[0];
        state.sydList = payload.res[1];
        state.sgnqList = payload.res[2];
    },
    getTime (state,payload) {
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        if (month < 10) {
            month = "0" + month;
        }
        if (day < 10) {
            day = "0" + day;
        }
        var nowDate1 = year + "-" + month + "-" + day;
        state.nowDate = nowDate1;
    }
}

const actions = {
    getTime({commit}){
        commit('getTime')
    },
    getLists({commit},payload){
        return new Promise((resolve,reject) =>{
            Vue.http.jsonp('/api/map',{param:payload.param})
                .then(res => {
                    commit({
                        type: 'getLists',
                        res: res.body.results
                    })
                resolve(res);
            }).catch(err => {
                console.log(err);
                reject(err);
            })
       })
    },
}

export default {
    state,
    mutations,
    actions
}
