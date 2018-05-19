import Vue from 'vue'
import  * as API from '../api/api'
/**
 *  1、获取取水户的详情信息：
 *  包括 基础信息、取水口
 *  2、获取 取水户的监测信息：
 *  包括 日取水、月取水、年取水
 *  3、获取 取水户的列表信息
 *  4、获取取水户的查询条件信息
 *  5、获取翻页
 *  6、获取搜索组件信息
 */
const state = {
    listInfo: {total:'30',desc:'共计查询xx1',lists:[{title:'上海宝信软件',href:'/qshDetail/1',tag1:'1',tag2:'1',tag3:'1'}
    ,{title:'上海嘛哩屋',href:'/qshDetail/2'}
    ,{title:'上海报亭',href:'/qshDetail/3',tag1:'11111',tag2:'111',tag3:'111'}
    ,{title:'上海报亭',href:'/qshDetail/4',tag1:'1',tag2:'1',tag3:'1'}
    ,{title:'上海报亭',href:'/qshDetail/5',tag1:'111',tag2:'221',tag3:'111'}
    ,{title:'上海报亭',href:'/qshDetail/6',tag1:'111',tag2:'221',tag3:'111'}
    ,{title:'上海报亭',href:'/qshDetail/7',tag1:'111',tag2:'331',tag3:'3331'}
    ,{title:'上海报亭',href:'/qshDetail/7',tag1:'111',tag2:'331',tag3:'3331'}]},
    listDetail:{name:'上海城投发展有限公司',wtnum:345.33,yt:'工业用水',
                pcode:'123455',addr:'上海宝山友谊路1016号',lng:121.372882,lat:31.176523,
                qsk:[{qskname:'黄浦江A',xkz:'取水[2017]',xksl:30.1,x:121.604799,y:31.217459},
                    {qskname:'黄浦江B',xkz:'取水[2017]',xksl:31.1,x:121.403122,y:31.317181},
                    {qskname:'黄浦江C',xkz:'取水[2017]',xksl:32.1,x:121.203122,y:31.217181}]},
    queryMenu:[{title:'监控级别',ol:'监控级别',select:'',key:'jkjb',type:'checkbox',children:[
                  {title:'不限',key:'-1',checked:true},{title:'市级',key:'1',checked:false},{title:'市级',key:'2',checked:false}]},
               {title:'发证单位',ol:'发证单位',select:'',key:'fzdw',type:'checkbox',children:[
                  {title:'不限',key:'-1',checked:true},{title:'市级',key:'1',checked:false},{title:'市级',key:'2',checked:false}]},
               {title:'颁证水量',ol:'颁证水量',select:'',key:'bzsl',type:'radio',children:[
                  {title:'不限',key:'-1',checked:true},{title:'市级',key:'1',checked:false},{title:'市级',key:'2',checked:false}]},
               {title:'取水用途',ol:'取水用途',select:'',key:'qsyt',type:'checkbox',children:[
                  {title:'不限',key:'-1',checked:true},{title:'市级',key:'1',checked:false},{title:'市级',key:'2',checked:false}]}
             ],
    loading:true,
    pageNum:10,
    pageEnd:1,
    pageStart:1,
    qslInfo:[] // 获取取水量
}

const mutations = {
    getLists (state, payload) {
      state.listInfo = payload.res
    },
    getListsByParams (state, payload) {
      state.listInfo = payload.res
    },
    // 下拉加载 ，就相当于翻页一次
    loadMore (state,payload){
        state.listInfo = state.listInfo.contact(payload.res)
        state.pageStart += 1
    },
    getListsDetail(state,payload) {
        state.listDetail = payload.res;
    },
    getQueryMenu(state,payload) {
        state.queryMenu = payload.res;
    },
    getQslInfo(state,payload) {
        state.qslInfo = payload.res;
    }
}

const actions = {
    getLists({commit}, payload){
        return new Promise((resolve,reject) =>{
            Vue.http.post(API.QSH_LIST,{params:payload.param,page:0})
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
    // 这个查询默认就是 从0 开始的10条 根据条件查询取水户列表
    getListsByParams({commit},payload){
        return new Promise((resolve,reject) =>{
            Vue.http.post(API.QSH_LIST,{params:payload.param,page:0})
                .then(res => {
                    commit({
                        type: 'getListsByParams',
                        res: res.body.results
                    })
                resolve(res);
            }).catch(err => {
                console.log(err);
                reject(err);
            })
       })
    },
    // 翻页
    loadMore({commit},payload){
        return new Promise((resolve,reject) =>{
            Vue.http.get('/api/map',{param:payload.param,page:state.pageStart})
                .then(res => {
                    commit({
                        type: 'getListsByParams',
                        res: res.body.results
                    })
                resolve(res);
            }).catch(err => {
                console.log(err);
                reject(err);
            })
       })
    },
    getListsDetail({commit},payload){
        return new Promise((resolve,reject) =>{
            Vue.http.get('/api/map',{id:payload.id})
                .then(res => {
                    commit({
                        type: 'getListsDetail',
                        res: res.body.results
                    })
                resolve(res);
            }).catch(err => {
                console.log(err);
                reject(err);
            })
       })       
    },
    getQueryMenu({commit}){
        return new Promise((resolve,reject) =>{
            Vue.http.post(API.QSH_QSL,{params:payload.param,page:0})
                .then(res => {
                    commit({
                        type: 'getQueryMenu',
                        res: res.body.results
                    })
                    resolve(res);
                }).catch(err => {
                console.log(err);
                reject(err);
            })
        })
    },
    getQslInfo({commit},payload){
        return new Promise((resolve,reject) =>{
            Vue.http.get('/api/map',{type:payload.type})
                .then(res => {
                    commit({
                        type: 'getQslInfo',
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