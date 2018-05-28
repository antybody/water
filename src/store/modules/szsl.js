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
    zdList:[
        {txt:'站点总数',value:'10'},
        {txt:'巡检总数',value:'20'},
        {txt:'巡检率',value:'30%'},
        {txt:'到报站点',value:'30'}
    ],
    ywList:[
        {txt:'任务总数',value:'60'},
        {txt:'完成数',value:'20'},
        {txt:'完成率',value:'70%'}
    ],
    nowDate:'',
    sjListUp:[],
    sjListDown:[]
}

const mutations = {
    getSjLists (state,payload) {
        // 结果处理
        state.sjListUp = payload.res[0];
        state.sjListDown = payload.res[1];
    },
    getLists (state, payload) {
        state.qshList = payload.res[0];
        state.sydList = payload.res[1];
        state.sgnqList = payload.res[2];
    },
    getYwLists (state,payload) { // 运维考核的 - 整体
        state.ywList = payload.res[0];
        state.zdList = payload.res[1];
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
    getSjLists({commit},payload){
        Vue.http.jsonp('/api/map',{param:payload.param})
        .then(res => {
            commit({
                type: 'getSjLists',
                res: res.body.results   
            })
        }).catch(err => {
            console.log(err);
            reject(err);
        })
    },
    getYwLists({commit},payload){
        Vue.http.jsonp('/api/map',{param:payload.param})
        .then(res => {
            commit({
                type: 'getSjLists',
                res: res.body.results   
            })
        }).catch(err => {
            console.log(err);
            reject(err);
        })
    }
}

export default {
    state,
    mutations,
    actions
}
