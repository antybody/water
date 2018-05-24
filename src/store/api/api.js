/**
 *  跟页面接口相关的定义
 */
import * as Url from "../url/url"
//后台接口地址
// const BASE_URL = 'http://101.230.199.221:7005/wrmsApp'
const BASE_URL = 'http://localhost:8080/wrmsApp'
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
/**
 * @name 取水许可证
 * @params
 * */
export const QSH_XKZ = BASE_URL + '/app/watercard/getWaterCard?access_token=[b36680850768ff1b]';
/**
 * @name 按月查询取水量
 * @params year type=query
 * */
export const QSH_QSL = BASE_URL + '/app/water/getYearSl?access_token=[b36680850768ff1b]';

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
 /* @name 水源地列表
 * @params pjlb pjsj jcnf indicator_num
 * */
export const SYD_LIST = BASE_URL + '/app/waterred/getWaterSydList?access_token=[b36680850768ff1b]';


/**
 * @name 大用水户
 * @params
 * */
export const DYSH_LIST = BASE_URL + '/app/wateruser/getDysh?access_token=[b36680850768ff1b]';
