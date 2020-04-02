/**
 * 验证各种输入是否合法
 */

/**
 * 验证URL是否合法
 * @param {string} url
 * @returns {Boolean}
 */
export function isURL(url) {
    const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
    return reg.test(url);
}

/**
 * 验证邮箱是否合法
 * @param {string} email
 * @returns {Boolean}
 */
export function isEmail(email) {
    const reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    return reg.test(email);
}

/**
 * 验证密码是否符合规范
 * 最短长度为6位，最长为32位
 * 至少包含数字和字母，可以包含下划线（'_'）
 * @param {string} password
 * @returns {Boolean}
 */
export function isPassword(password) {
    const reg = /^(?![\d]+$)(?![a-zA-Z]+$)(?![!#$%^&*]+$)(?![a-zA-Z_~@#$^,.;*&%]+$)[\da-zA-Z_~@#$^,.;*&%]{6,20}$/;
    return reg.test(password);
}

// 验证密码安全性强度
/**
 * 验证密码安全性强度为弱
 * 纯数字，纯字母，纯特殊字符
 * @param {string} password
 * @returns {boolean}
 */
export function isWeakPassword(password) {
    const reg = /^(?:\d+|[a-zA-Z]+|[!@#$%^&*]+)$/;
    return reg.test(password);
}

/**
 * 验证密码安全性强度为中
 * 字母+数字，字母+特殊字符，数字+特殊字符
 * @param {string} password
 * @returns {boolean}
 */
export function isCommonPassword(password) {
    const reg = /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$/;
    return reg.test(password);
}

/**
 * 验证密码安全性强度为强
 * 字母+数字+特殊字符
 * @param {string} password
 * @returns {boolean}
 */
export function isStrongPassword(password) {
    const reg = /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)(?![a-zA-z\d]+$)(?![a-zA-z!@#$%^&*]+$)(?![\d!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$/;
    return reg.test(password);
}

/**
 * 验证手机号
 * 国内手机号码，不包含+086
 * @param {string} tellphone
 * @returns {boolean}
 */
export function isTellPhone(tellphone) {
    const reg = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/;
    return reg.test(tellphone)
}

/**
 * 验证固定电话
 * @param {string} tell
 * @returns {boolean}
 */
export function isTell(tell) {
    const reg = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/;
    return reg.test(tell);
}

/**
 * 验证联系电话
 * 可以为固定电话，可以为手机号码
 */
export function isPhone(phone) {
    const reg = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/;
    return reg.test(phone);
}


/**
 * 验证图片大小是否合法
 * @param {file} file
 * @param {size} size
 * @returns {boolean}
 */
export function isRightSize(file, size) {
    const isLt2M = file.size / size < 1;
    return isLt2M;
}
/**
 * 验证图片类型是否为jpg或png
 * @param {file} file
 * @returns {boolean}
 */
export function isImage(file) {
  const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
  return isJPG;
}


/**
 * 验证身份证18位是否有效
 * @param {string} value
 * @returns {boolean}
 */
export function isIdCard(value) {
    const reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
    return reg.test(value);
}

/**
 * 验证正int32整数
 * @param {String} value
 * @returns {boolean}
 */
export function isPositiveInt32(value) {
    if (!value) {
        return false;
    }
    if (!/^[1-9][\d]*$/.test(value)) {
        return false;
    }
    if (parseInt(value) <= 0 || parseInt(value) > 2147483647) {
        return false;
    }
    return true;
}