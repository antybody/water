/**
 *  跟页面接口相关的定义
 */
import * as Url from "../url/url"
 //后台接口地址
 // const BASE_URL = 'http://101.230.199.221:7005/wrmsApp'
 const BASE_URL = 'http://localhost:8080'

 /**取水户 都以qsh 开头*/
 /**
  * @name 取水户列表
  * @params rowNumStar rowNumEnd wiuTp watuserDivname watuserCom
  * */
 export const QSH_LIST = BASE_URL + '/app/water/getWaterUser?access_token=[b36680850768ff1b]';
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