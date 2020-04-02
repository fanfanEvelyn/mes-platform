import utile from '@/lib/utils';
/**
 * 全局过滤器，用于在不改变字符串内容的情况下转换字符串显示
 */

/**
 * 时间戳转换为北京时间字符串
 * 1562557786000 => "2019/07/08 11:49:46"
 * @param {time} time 
 * @return {string}
 */
export function timeString(time) {
    if (time) {
        return utile.toolFn.timeFormat(time)
    } 
    return ''
}

/**
 * 时间戳转换为北京日期字符串
 * 1562557786000 => "2019/07/08 11:49:46"
 * @param {time} date 
 * @return {string}
 */
export function dateString(date) {
    if (date) {
        return utile.toolFn.timeFormat(date).slice(0, 10);
    } 
    return ''
}

/**
 * 10000 => "10,000"
 * @param {number} num
 */
export function toThousandFilter(num) {
    return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

/**
 * 性别
 * @param {number} sex
 */
export function sexTxt (sex) {
    let r = '未知'
    if (sex == 1){
      r = '男';
    }else if(sex == 2){
      r = '女';
    }
    return r
  }
  