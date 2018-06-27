/**
 *  跟页面接口相关的定义
 */
import * as Url from "../url/url"
//后台接口地址
const BASE_URL = 'http://101.230.199.221:7005/wrmsApp'
// const BASE_URL = 'http://localhost:8080'
/**
 * @name 取水相关新闻列表
 * @param
 * */
export const NEWS_LIST = BASE_URL + '/app/waternews/getWaterNewsList?access_token=[b36680850768ff1b]';
/**
 * @name 取水相关新闻详细内容
 * @param infoid
 * */
export const NEWS_CONTENT = BASE_URL + '/app/waternews/getWaterNewsInfo?access_token=[b36680850768ff1b]';
/**取水户 都以qsh 开头*/
/**
 * @name 取水户列表
 * @params rowNumStar rowNumEnd wiuTp watuserDivname watuserCom
 * */
export const QSH_LIST = BASE_URL + '/app/water/getWaterUser?access_token=[b36680850768ff1b]';
export const QSH_QSK = BASE_URL + '/app/water/getQskInfo?access_token=[b36680850768ff1b]';
export const QSH_CONTENT = BASE_URL + '/app/water/getQshxx?access_token=[b36680850768ff1b]';
/**
 * @name 取水许可证
 * @params
 * */
export const QSH_XKZ = BASE_URL + '/app/watercard/getWaterCard?access_token=[b36680850768ff1b]';
/**
 * @name 超许可水量
 * @params
 * */
export const QSH_CXKZ = BASE_URL + '/app/water/getOverXk?access_token=[b36680850768ff1b]';
/**
 * @name 取水许可证分布
 * @params
 * */
export const QSH_XKZ_FB = BASE_URL + '/app/newhome/queryQsxkz?access_token=[b36680850768ff1b]';
/**
 * @name 按月查询取水量
 * @params year type=query
 * */
export const QSH_QSL = BASE_URL + '/app/water/getSl?access_token=[b36680850768ff1b]';

/**水功能区相关 SGNQ*/
/**
 * @name 水功能区达标率
 * @params pjlb pjsj jcnf indicator_num
 * */

export const SGNQ_DBL = BASE_URL + '/app/waterarea/getWaterAreaPj?access_token=[b36680850768ff1b]';
//水功能区列表
export const SGNQ_LIST = BASE_URL + '/app/sgn/querySgl?access_token=[b36680850768ff1b]';
//水功能区详细数据
export const SGNQ_CONTENT = BASE_URL + '/app/sgn/querySglXq?access_token=[b36680850768ff1b]';
//水功能区评价情况
export const SGNQ_PJ = BASE_URL + '/app/newhome/sgnqdbList?access_token=[b36680850768ff1b]';
/**
 * @name 水源地曲线
 * @params pjlb pjsj jcnf indicator_num
 * */
export const SYD_CHART = BASE_URL + '/app/waterred/getWaterSydChart?access_token=[b36680850768ff1b]';
/**
 * @name 水文测站列表
 * @params pjlb pjsj jcnf indicator_num
 * */
export const SGNQJC_LIST = BASE_URL + '/app/waterred/getWaterRedCzList?access_token=[b36680850768ff1b]';
/**
 * @name 水文测站曲线
 * @params pjlb pjsj jcnf indicator_num
 * */
export const SWCZ_CHART = BASE_URL + '/app/waterred/getWaterGnqChart?access_token=[b36680850768ff1b]';
/**
 * @name 咸潮列表
 * @params pjlb pjsj jcnf indicator_num
 * */
export const XC_LIST = BASE_URL + '/app/waterred/getWaterXcList?access_token=[b36680850768ff1b]';
/** @name 水源地列表
 * @params pjlb pjsj jcnf indicator_num
 * */
export const SYD_LIST = BASE_URL + '/app/waterred/getWaterSydList?access_token=[b36680850768ff1b]';


/**
 * @name 大用水户
 * @params
 * */
export const DYSH_LIST = BASE_URL + '/app/wateruser/getDysh?access_token=[b36680850768ff1b]';
export const DYSH_CONTENT = BASE_URL + '/app/wateruser/getJcxx?access_token=[b36680850768ff1b]';

/**
 * @name 运维巡检
 * @params
 * */
//预警列表
export const WARN_LIST = BASE_URL + '/app/route/getWarnList?access_token=[b36680850768ff1b]';
//巡检计划接口
export const ROUTE_PLAN = BASE_URL + '/app/route/routePlan?access_token=[b36680850768ff1b]';

/**
 * @name 数据质量考核
 * @params
 * */
//今日情况
export const JRQK_LIST = BASE_URL + '/app/sjzl/getSjzlkhJrqk?access_token=[b36680850768ff1b]';
//取用水数据
//监测情况接口
export const QYSJC_LIST = BASE_URL + '/app/sjzl/getSjzlkhQyssjJcqk?access_token=[b36680850768ff1b]';
//数据质量走势接口
export const QYSZS_LIST = BASE_URL + '/app/sjzl/getSjzlkhQyssjSjzlZs?access_token=[b36680850768ff1b]';
//数据质量排行榜
export const QYS_PHB = BASE_URL + '/app/sizl/get   ?access_token=[b36680850768ff1b]';
//水质评价数据
//监测情况接口
export const SZPJQK_LIST = BASE_URL + '/app/sjzl/getSzpjsjJcqk?access_token=[b36680850768ff1b]';
//数据质量走势接口
export const SZPJZS_LIST = BASE_URL + '/app/sjzl/getSzpjsjSjzlzs?access_token=[b36680850768ff1b]';
//数据质量排行榜
export const SZPJ_PHB = BASE_URL + '/app/sjzl/getSzpjsjSjzlphb?access_token=[b36680850768ff1b]';