<template>
    <vue-view v-show="open">
        <div class="searchbar_tags">
            <!--搜索框-->
            <div class="searchbar_module">
                <form class="searchbar_tags_form">
                    <input type="search" id="keyword" class="searchbar_text" v-model="searchItem"
                           :placeholder='inputtext'>
                    <input type="submit">
                    <i class="searchbar_icon"></i>
                </form>
                <span class="searchbar_cancel" @click="closeBar()">取消</span>
            </div>
            <!--搜索结果-->
            <div class="wt-history-info">
                <h4>推荐查询</h4>
                <redlists :lists="lists"></redlists>
            </div>
        </div>
    </vue-view>
</template>

<script>
    import redlists from './redlists'
    import {mapState, mapActions} from 'vuex'
    import Vue from 'vue'
    import {debounce} from 'lodash'
    import * as API from '../../src/store/api/api'

    export default {
        components: {
            redlists
        },
        props: ['open', 'inputtext', 'searchtype', 't'],
        created() {
            // 获得默认的数据
            console.log("获取前端数据" + this.searchtype);
            // this.$nextTick(
            //   function(){this.$store.dispatch({type:'getListByParams',param:this.searchtype})}
            // )
        },
        watch: {
            searchItem: function (val, oldval) {
                this.$nextTick(() => {
                    if (val != "")
                        this.itemQuery();
                })
            }
        },
        // computed: {
        //     ...mapState({
        //         loading: state => state.searchBar.loading,
        //         lists: state => state.searchBar.searchLists
        //     })
        // },
        data() {
            return {
                searchItem: '',
                lists:''
                //  lists: [{title: '上海宝信', href: '/qshDetail/1', tag1: '测试', tag2: '测试', tag3: '测试'},
                //    {title: '北京宝信', href: '/qshDetail/1', tag1: '测试', tag2: '测试', tag3: '测试'}]
            }
        },
        methods: {
            // 这里有个阻止继续操作的事件，防止多次点击

            itemQuery: debounce(function () {
                // 这里引用 带条件的查询
                console.log("----- 查询了我-----");
                console.log(this.searchItem);
                if (this.searchItem.length === 0)
                    return false
                //console.log(this.$route.params.t);
                this.t = this.$route.params.t;
                console.log(this.t);
                switch (this.t){
                    case "dbsqsh":
                        let paramData1 = {
                            type: 'query',
                            wiuTp: '',
                            watuserDivname: '',
                            watuserCom: '',
                            watuserWatapp: '',
                            monitorlevel: '',
                            watuserName: this.searchItem,
                            currentPage: 10
                        }
                        console.log(paramData1)
                        paramData1 = encodeURI(encodeURI(JSON.stringify(paramData1)));
                        this.$http.jsonp(API.QSH_LIST + "&params=" + paramData1).then(
                            response => {
                                this.lists = []
                                console.log(response.data.data);
                                if (response.data.data.length === 0) {
                                    this.lists.push({
                                        title: '暂无数据'
                                        // ,href: '',
                                        // tag1: '',
                                        // tag2: '',
                                        // tag3: ''
                                    })
                                } else {
                                    for (let value of response.data.data) {
                                        this.lists.push({
                                            title: value.watuserName,
                                            href: '/qshDetail/' + value.watuserId,
                                            tag1: value.watuserWorktype,
                                            tag2: value.watuserWatapp,
                                            tag3: value.wiuTp
                                        })
                                    }
                                }
                            }, response => {
                                console.log(response)
                            })
                        break;
                    case "gq":
                        let paramData2 = {
                            type: 'query',
                            gqgm :'',
                            jllx :'',
                            ntlx :'',
                            xzqh :'',
                            irrname: this.searchItem,
                            currentPage: 10
                        }
                        console.log(paramData2)
                        paramData2 = encodeURI(encodeURI(JSON.stringify(paramData2)));
                        this.$http.jsonp(API.GQ_LIST + "&params=" + paramData2).then(
                            response => {
                                this.lists = []
                                console.log(response.data.data);
                                if (response.data.data.length === 0) {
                                    this.lists.push({
                                        title: '暂无数据'
                                        // ,href: '',
                                        // tag1: '',
                                        // tag2: '',
                                        // tag3: ''
                                    })
                                } else {
                                    for (let value of response.data.data) {
                                        this.lists.push({
                                            title: value.irrname,
                                            href: '/gqView/' + value.id,
                                            tag1: value.irrscale,
                                            tag2: value.calculatetype,
                                            tag3: value.managementunit
                                        })
                                    }
                                }
                            }, response => {
                                console.log(response)
                            })
                        break;
                    case "qsxkz":
                        let paramData3 = {
                            qslx: '',
                            qsqrmc: this.searchItem,
                            qsyt: '',
                            currentPage: 10
                        }
                        console.log(paramData3)
                        paramData3 = encodeURI(encodeURI(JSON.stringify(paramData3)));
                        this.$http.jsonp(API.QSH_XKZ + "&params=" + paramData3).then(
                            response => {
                                this.lists = []
                                console.log(response.data.data);
                                if (response.data.data.length === 0) {
                                    this.lists.push({
                                        title: '暂无数据'
                                        // ,href: '',
                                        // tag1: '',
                                        // tag2: '',
                                        // tag3: ''
                                    })
                                } else {
                                    for (let value of response.data.data) {
                                        this.lists.push({
                                            title: value.qsqrmc,
                                            href: '/qsxkzDetail/' + value.id,
                                            tag1: value.qsyt,
                                            tag2: value.qsfs,
                                            tag3: value.qsl
                                        })
                                    }
                                }
                            }, response => {
                                console.log(response)
                            })
                        break;
                    case "dysh":
                        let paramData4 = {
                            companyname: this.searchItem,
                            type: "query",
                            yslx: '',
                            xzqh: '',
                            jclx: '',
                            szysjqmc: ''
                        }
                        console.log(paramData4)
                        paramData4 = encodeURI(encodeURI(JSON.stringify(paramData4)));
                        this.$http.jsonp(API.DYSH_LIST + "&params=" + paramData4).then(
                            response => {
                                this.lists = []
                                console.log(response.data.data);
                                if (response.data.data.length === 0) {
                                    this.lists.push({
                                        title: '暂无数据'
                                        // ,href: '',
                                        // tag1: '',
                                        // tag2: '',
                                        // tag3: ''
                                    })
                                } else {
                                    for (let value of response.data.data) {
                                        this.lists.push({
                                            title: value.companyname,
                                            href: '/dyshView/' + value.id,
                                            tag1: value.szysjqmc,
                                            tag2: value.yslx,
                                            tag3: value.jclx
                                        })
                                    }
                                }
                            }, response => {
                                console.log(response)
                            })
                        break;
                    case "sgnq":
                        let paramData5 = {
                            wfzNm: this.searchItem,
                            type: "query",
                            wtType: '',
                            tgWq: '',
                            currentPage:10
                        }
                        console.log(paramData5)
                        paramData5 = encodeURI(encodeURI(JSON.stringify(paramData5)));
                        this.$http.jsonp(API.SGNQ_LIST + "&params=" + paramData5).then(
                            response => {
                                this.lists = []
                                console.log(response.data.data);
                                if (response.data.data.length === 0) {
                                    this.lists.push({
                                        title: '暂无数据'
                                        // ,href: '',
                                        // tag1: '',
                                        // tag2: '',
                                        // tag3: ''
                                    })
                                } else {
                                    for (let value of response.data.data) {
                                        this.lists.push({
                                            title: value.wfzNm,
                                            href: '/sgnqDetail/' + value.wfzNb,
                                            tag1: value.wtType,
                                            tag2: value.belRiv,
                                            tag3: value.tgWq
                                        })
                                    }
                                }
                            }, response => {
                                console.log(response)
                            })
                        break;
                    case "xc":
                        let paramData6 = {
                            kzsyd: '',
                            state: '',
                            name:this.searchItem,
                            currentPage:10
                        }
                        console.log(paramData6)
                        paramData6 = encodeURI(encodeURI(JSON.stringify(paramData6)));
                        this.$http.jsonp(API.XC_LIST + "&params=" + paramData6).then(
                            response => {
                                this.lists = []
                                console.log(response.data.data);
                                if (response.data.data.length === 0) {
                                    this.lists.push({
                                        title: '暂无数据'
                                        // ,href: '',
                                        // tag1: '',
                                        // tag2: '',
                                        // tag3: ''
                                    })
                                } else {
                                    for (let value of response.data.data) {
                                        this.lists.push({
                                            title: value.name,
                                           // href: '/sgnqDetail/' + value.id,
                                            tag1: value.nm_salinity,
                                            tag2: value.state,
                                         //   tag3: value.tgWq
                                        })
                                    }
                                }
                            }, response => {
                                console.log(response)
                            })
                        break;

                    case "hclb":
                        let paramData7 = {
                            type: 'query',
                            id:"",
                            xmmc:this.searchItem,
                            currentPage:10
                        }
                        console.log(paramData7);
                        paramData7 = encodeURI(encodeURI(JSON.stringify(paramData7)));
                        this.$http.jsonp(API.QSGC_XCHC + "&params=" + paramData7).then(
                            response => {
                                this.lists = []
                                console.log(response.data.jcxx);
                                if (response.data.jcxx.length === 0) {
                                    this.lists.push({
                                        title: '暂无数据'
                                    })
                                } else {
                                    for (let value of response.data.jcxx) {
                                        this.lists.push({
                                            title: value.xmmc,
                                            href: '/qsgcTableView',
                                            tag1: value.isblxkz=='1'?'是':'否',//是否办理许可证
                                            tag2: value.hczzqm,//核查人
                                            tag3: value.xchcrq,

                                        })
                                    }
                                }
                            }, response => {
                                console.log(response)
                            })
                        break;

                }

            }, 500),
            closeBar: function () {
                this.$emit('closeBar');
            }
        }
    }
</script>

<style>
    .searchbar_module {
        display: -webkit-box;
        width: 100%;
        height: 50px;
        background-color: #ececec;
        border-bottom: solid 1px #d9d9d9;
    }

    .searchbar_tags {
        z-index: 1015;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #ececec;
        flex-direction: column;
        color: #999;
    }

    .searchbar_tags_form {
        display: -webkit-box;
        -webkit-box-flex: 1;
        height: 33px;
        margin: 9px 0 9px 10px;
        border-radius: 4px;
        background-color: #fff;
    }

    .searchbar_text {
        color: #333;
    }

    .searchbar_tags_form input:first-of-type {
        display: -webkit-box;
        -webkit-box-flex: 1;
        height: 33px;
        border: 0;
        border-radius: 4px 0 0 4px;
        font-size: 1rem;
        outline: 0;
        color: #999;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        -webkit-appearance: none;
        padding: 0 10px 2px 10px;
        box-sizing: border-box;
        width: 60%;
    }

    .searchbar_tags_form input[type=submit] {
        position: relative;
        z-index: 2;
        width: 33px;
        height: 33px;
        border-radius: 0 4px 4px 0;
        border: 0;
        outline: 0;
        background-color: transparent;
        display: none;
    }

    .searchbar_icon {
        position: absolute;
        top: 17px;
        right: 58px;
        display: block;
        height: 13px;
        width: 13px;
        border-radius: 13px;
        border: 1px solid #999;
        vertical-align: middle;
        z-index: 1;
    }

    .searchbar_icon::after {
        position: absolute;
        top: 12px;
        left: 11px;
        content: '';
        width: 5px;
        height: 2px;
        background: #999999;
        transform: rotate(45deg);
        -webkit-transform: rotate(45deg);
    }

    .searchbar_cancel {
        display: -webkit-box;
        -webkit-box-pack: center;
        -webkit-box-align: center;
        width: 48px;
        height: 48px;
        color: #62ab00;
        font-size: 0.875rem;
    }

    .wt-history-info h4 {
        height: 30px;
        line-height: 30px;
        padding-left: 15px;
        font-size: 0.825rem;
        color: #333;
        border-bottom: solid 1px #d9d9d9;
        background-color: #f4f4f4;
        margin: 0;
    }
</style>
