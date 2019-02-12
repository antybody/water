import Vue from 'vue'
import * as API from '../api/api'

/**
 *  1、获取灌区的详情信息：
 *  包括 基础信息、取水信息
 *  2、获取 灌区的监测信息：
 *  包括 月取水、年取水
 *  3、获取 灌区的列表信息
 *  4、获取灌区的查询条件信息
 *  5、获取翻页
 *  6、获取搜索组件信息
 *  2018.12.03
 *  huaibaoqi
 */
const state = {
    listInfo: {
        total: '30', desc: '共计查询xx1', lists: [{title: '上海宝信软件', href: '/qshDetail/1', tag1: '1', tag2: '1', tag3: '1'}
            , {title: '上海嘛哩屋', href: '/qshDetail/2'}
            , {title: '上海报亭', href: '/qshDetail/3', tag1: '11111', tag2: '111', tag3: '111'}
            , {title: '上海报亭', href: '/qshDetail/4', tag1: '1', tag2: '1', tag3: '1'}
            , {title: '上海报亭', href: '/qshDetail/5', tag1: '111', tag2: '221', tag3: '111'}
            , {title: '上海报亭', href: '/qshDetail/6', tag1: '111', tag2: '221', tag3: '111'}
            , {title: '上海报亭', href: '/qshDetail/7', tag1: '111', tag2: '331', tag3: '3331'}
            , {title: '上海报亭', href: '/qshDetail/7', tag1: '111', tag2: '331', tag3: '3331'}]
    },
    listDetail: {
        name: '上海城投发展有限公司', wtnum: 345.33, yt: '工业用水',
        pcode: '123455', addr: '上海宝山友谊路1016号', lng: 121.372882, lat: 31.176523,
        qsk: [{qskname: '黄浦江A', xkz: '取水[2017]', xksl: 30.1, x: 121.604799, y: 31.217459},
            {qskname: '黄浦江B', xkz: '取水[2017]', xksl: 31.1, x: 121.403122, y: 31.317181},
            {qskname: '黄浦江C', xkz: '取水[2017]', xksl: 32.1, x: 121.203122, y: 31.217181}]
    },
    queryMenu: [
        {
            title: '灌区规模', ol: '灌区规模', select: '', key: 'gqgm', type: 'checkbox', children: [
                {title: '不限', key: '-1', checked: true},
                {title: '小型灌区', key: '10320003', checked: false},
                {title: '中型灌区', key: '10320002', checked: false},
                {title: '大型灌区', key: '10320001', checked: false}
            ]
        },
        {
            title: '计量类型', ol: '计量类型', select: '', key: 'jllx', type: 'checkbox', children: [
                {title: '不限', key: '-1', checked: true},
                {title: '智能水表', key: '10280001', checked: false},
                {title: '流量计', key: '10280002', checked: false},
                {title: '电表', key: '10280003', checked: false},
                {title: '定额法', key: '10280004', checked: false}
            ]
        },
        {
            title: '农田类型', ol: '农田类型', select: '', key: 'ntlx', type: 'checkbox', children: [
                {title: '不限', key: '-1', checked: true},
                {title: '水田', key: '10260001', checked: false},
                {title: '菜田', key: '10260002', checked: false},
                {title: '鱼塘', key: '10260003', checked: false},
                {title: '林果', key: '10260004', checked: false},
                {title: '水浇地', key: '10286005', checked: false},
                {title: '水田+菜田', key: '10260006', checked: false},
                {title: '水田+鱼塘', key: '10260007', checked: false}
            ]
        },
        {
            title: '行政区划', ol: '行政区划', select: '', key: 'xzqh', type: 'checkbox', children: [
                {title: '不限', key: '-1', checked: true},
                {title: '闵行区', key: '02030002', checked: false},
                {title: '浦东新区', key: '02030006', checked: false},
                {title: '青浦区', key: '02030008', checked: false},
                {title: '松江区', key: '02030009', checked: false},
                {title: '金山区', key: '020300010', checked: false},
                {title: '宝山区', key: '02030011', checked: false},
                {title: '崇明区', key: '02030012', checked: false},
                {title: '嘉定区', key: '02030017', checked: false},
                {title: '奉贤区', key: '02030013', checked: false},
            ]
        }
    ],
    loading: true,
    pageNum: 10,
    pageEnd: 1,
    pageStart: 1,
    qslInfo: [] // 获取取水量
}

const mutations = {
    getLists(state, payload) {
        state.listInfo = payload.res
    },
    getListsByParams(state, payload) {
        state.listInfo = payload.res
    },
    // 下拉加载 ，就相当于翻页一次
    loadMore(state, payload) {
        state.listInfo = state.listInfo.contact(payload.res)
        state.pageStart += 1
    },
    getListsDetail(state, payload) {
        state.listDetail = payload.res;
    },
    getQueryMenu(state, payload) {
        state.queryMenu = payload.res;
    },
    getQslInfo(state, payload) {
        state.qslInfo = payload.res;
    }
}

const actions = {
    getLists({commit}, payload) {
        return new Promise((resolve, reject) => {
            Vue.http.post(API.GQ_LIST, {params: payload.param, page: 0})
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
    getListsByParams({commit}, payload) {
        return new Promise((resolve, reject) => {
            Vue.http.post(API.GQ_LIST, {params: payload.param, page: 0})
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
    loadMore({commit}, payload) {
        return new Promise((resolve, reject) => {
            Vue.http.get('/api/map', {param: payload.param, page: state.pageStart})
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
    getListsDetail({commit}, payload) {
        return new Promise((resolve, reject) => {
            Vue.http.get('/api/map', {id: payload.irrid})
            //Vue.http.get(API.GQ_CONTENT, {id: payload.irrid})
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
    getQueryMenu({commit}) {
        return new Promise((resolve, reject) => {
            Vue.http.post(API.GQ_LIST, {params: payload.param, page: 0})
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
    getQslInfo({commit}, payload) {
        return new Promise((resolve, reject) => {
            Vue.http.get('/api/map', {type: payload.type})
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