import utils from './utils.js'
import { getUUID, Encrypt, Decrypt } from './crypto.js'
const CryptoJS = require('crypto-js');  //引用AES源码js

// console.log(getUUID())
const TokenKey = 'token';   // 保存token的字段名称
const key = CryptoJS.enc.Utf8.parse(getUUID());  //十六位十六进制数作为密钥
const iv = CryptoJS.enc.Utf8.parse('6A6CB488E108D648');   //十六位十六进制数作为密钥偏移量，“sunfly”的16位MD5

// token相关操作

/**
 * 获取token
 * @return {string}
 */
export function getToken () {
    try {
        let token = utils.toolFn.sessionGet(TokenKey)
        if (token) {
            return Decrypt(key, iv, token) // 对获取的token解密
        }
        return ''
    } catch {
        // console.log('获取token失败')
        removeToken()
    }
}

/**
 * 设置token
 * @param {string} token 
 */
export function setToken (token) {
    return utils.toolFn.sessionSet(TokenKey, Encrypt(key, iv, token))
}

/**
 * 移除token
 */
export function removeToken () {
    return utils.toolFn.sessionRemove(TokenKey)
}



/**
 * 获取token
 * @return {string}
 */
export function getLocalToken () {
    try {
        let token = utils.toolFn.localGet(TokenKey)
        if (token) {
            return Decrypt(key, iv, token) // 对获取的token解密
        }
        return ''
    } catch {
        //
        removeLocalToken()
    }

}

/**
 * 设置token
 * @param {string} token 
 */
export function setLocalToken (token) {
    return utils.toolFn.localSet(TokenKey, Encrypt(key, iv, token)) // token加密存储
}

/**
 * 移除token
 */
export function removeLocalToken () {
    return utils.toolFn.localRemove(TokenKey)
}
// uid相关操作

const uidKey = 'uid';   // 保存token的字段名称

/**
 * 获取token
 * @return {string}
 */
export function getUid () {
    return sessionStorage.getItem(uidKey)
}

/**
 * 设置token
 * @param {string} uid 
 */
export function setUid (uid) {
    return sessionStorage.setItem(uidKey, uid)
}

/**
 * 移除token
 */
export function removeUid () {
    return sessionStorage.removeItem(uidKey)
}