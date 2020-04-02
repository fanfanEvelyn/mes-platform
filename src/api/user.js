/**
 * 接口文件
 */
import request from '@/lib/request.js'  // 引入全局axios设置

function json2form (data) {
    let form = new FormData()
    Object.keys(data).forEach((key) => {
        form.append(key, data[key])
    })

    return form
}


/**
 * 用户登录
 * @param {object} data 
 * -username: 用户名
 * -password: 密码
 * @return {object}
 */
export function login (data) {
    return request({
        url: '/userinfo/loginWithUser',
        method: 'post',
        data
    })
}

/**
 * 用户登出
 * @param {object} data
 * -token: token
 * @return {object}
 */
export function loginout (data) {
    return request({
        url: '/userinfo/loginOut',
        method: 'post',
        data: json2form(data)
    })
}

/**
 * 获取用户信息
 * @param {object} data
 * -token: token
 * @return {object}
 */
export function getInfo (data) {
    return request({
        url: '/userinfo/loginWithToken',
        method: 'post',
        data: json2form(data)
    })
}

/**
 * 修改用户密码
 * @param {object} data
 * -token: token
 * @return {object}
 */
export function updatePassword (data) {
    return request({
        url: '/userinfo/modifyPassword',
        method: 'post',
        data
    })
}

/**
 * 添加子账号->邀请注册
 * @param {object} data
 * -token: token
 * @return {object}
 */
export function userinfoInviteRegister (data) {
    return request({
        url: '/userinfo/inviteRegister',
        method: 'post',
        data
    })
}

/**
 * 上传单个文件
 * @param {object} data
 * -token: token
 * @return {object}
 */
export function uploadFile (data) {
    return request({
        url: '/v1/upload/edit/uploadFile',
        method: 'post',
        data
    })
}
/**
 * 图片上传
 * @param {object} data 
 * @returns {object}
 */
export function uploadProductImage (data) {
    return request({
        url: '/v1/upload/edit/uploadImage',
        method: 'post',
        data: json2form(data)
    })
}
/**
 * 根据文件MD5删除指定
 * @param {object} data 
 * @returns {object}
 */
export function delProductImage (data) {
    return request({
        url: '/v1/upload/edit/deleteByFilesMD5',
        method: 'post',
        data
    })
}


/**
 * 查询社区数量
 * @param {object} data 
 * @returns {object}
 */
export function communityCount (data) {
    return request({
        url: '/community/info/count',
        method: 'post',
        data
    })
}

/**
 * 查询 所选社区下 所有的楼宇数量,房屋数量,商铺数量,门禁数量,监控数量,车位数量
 * @param {object} data 
 * @returns {object}
 */
export function communityCountAll (data) {
    return request({
        url: '/community/info/countAll',
        method: 'post',
        data
    })
}
/**
 * 根据社区ID,查询所有的楼栋下的 房屋，绑定人数等数量信息
 * @param {object} data 
 * @returns {object}
 */
export function buildingCountAll (data) {
    return request({
        url: '/building/info/countAll',
        method: 'post',
        data
    })
}


/**
 * 新增楼栋信息
 * @param {object} data 
 * @returns {object}
 */
export function buildingAddOne (data) {
    return request({
        url: '/building/info/addOne',
        method: 'post',
        data
    })
}

/**
 * 查询楼栋列表
 * @param {object} data 
 * @returns {object}
 */
export function buildingPagelist (data) {
    return request({
        url: '/building/info/pageList',
        method: 'post',
        data
    })
}

/**
 * 楼栋物理删除记录
 * @param {object} data 
 * @returns {object}
 */
export function buildingDeletet (data) {
    return request({
        url: '/building/info/delete',
        method: 'post',
        data
    })
}
/**
 * 查询所有楼栋
 * @param {object} data 
 * @returns {object}
 */
export function allBuildingList (data) {
    return request({
        url: '/building/info/getBuildingList',
        method: 'post',
        data
    })
}

/**
 * 楼栋修改记录
 * @param {object} data 
 * @returns {object}
 */
export function buildingModifyOne (data) {
    return request({
        url: '/building/info/modifyOne',
        method: 'post',
        data
    })
}

/**
 * 楼栋获取详情
 * @param {object} data 
 * @returns {object}
 */
export function buildingGetOne (data) {
    return request({
        url: '/building/info/getOne',
        method: 'post',
        data
    })
}



/**
 * 查询所有社区数据
 * @param {object} data 
 * @returns {object}
 */
export function allCommunityList (data) {
    return request({
        url: '/community/info/list',
        method: 'post',
        data
    })
}


/**
 * 新增社区记录
 * @param {object} data 
 * @returns {object}
 */
export function communityAddOne (data) {
    return request({
        url: '/community/info/addOne',
        method: 'post',
        data
    })
}

/**
 * 物理删除社区记录
 * @param {object} data 
 * @returns {object}
 */
export function communityDelete (data) {
    return request({
        url: '/community/info/delete',
        method: 'post',
        data
    })
}

/**
 * 获取社区详情记录
 * @param {object} data 
 * @returns {object}
 */
export function communityGetOne (data) {
    return request({
        url: '/community/info/getOne',
        method: 'post',
        data
    })
}

/**
 * 修改社区详情记录
 * @param {object} data 
 * @returns {object}
 */
export function communityModifyOne (data) {
    return request({
        url: '/community/info/modifyOne',
        method: 'post',
        data
    })
}

/**
 * 社区分页列表
 * @param {object} data 
 * @returns {object}
 */
export function communityPagelist (data) {
    return request({
        url: '/community/info/pageList',
        method: 'post',
        data
    })
}

/**
 * 单元分页列表
 * @param {object} data 
 * @returns {object}
 */
export function unitPagelist (data) {
    return request({
        url: '/unit/info/pageList',
        method: 'post',
        data
    })
}
/**
 * 单元新增
 * @param {object} data 
 * @returns {object}
 */
export function unitAddOne (data) {
    return request({
        url: '/unit/info/addOne',
        method: 'post',
        data
    })
}

/**
 * 单元物理删除
 * @param {object} data 
 * @returns {object}
 */
export function unitDelete (data) {
    return request({
        url: '/unit/info/delete',
        method: 'post',
        data
    })
}

/**
 * 单元获取详情
 * @param {object} data 
 * @returns {object}
 */
export function unitGetOne (data) {
    return request({
        url: '/unit/info/getOne',
        method: 'post',
        data
    })
}
/**
 * 单元获取所有
 * @param {object} data 
 * @returns {object}
 */
export function allUnitInfoList (data) {
    return request({
        url: '/unit/info/list',
        method: 'post',
        data
    })
}
/**
 * 单元获取所有传参
 * @param {object} data 
 * @returns {object}
 */
export function allUnitList (data) {
    return request({
        url: '/unit/info/getUnitList',
        method: 'post',
        data
    })
}
/**
 * 单元修改单个
 * @param {object} data 
 * @returns {object}
 */
export function unitModifyOne (data) {
    return request({
        url: '/unit/info/modifyOne',
        method: 'post',
        data
    })
}

/**
 * 户型分页列表
 * @param {object} data 
 * @returns {object}
 */
export function housetypePagelist (data) {
    return request({
        url: '/housetype/info/pageList',
        method: 'post',
        data
    })
}

/**
 * 新增户型
 * @param {object} data 
 * @returns {object}
 */
export function housetypeAddOne (data) {
    return request({
        url: '/housetype/info/addOne',
        method: 'post',
        data
    })
}

/**
 * 删除户型
 * @param {object} data 
 * @returns {object}
 */
export function housetypeDelete (data) {
    return request({
        url: '/housetype/info/delete',
        method: 'post',
        data
    })
}

/**
 * 获取户型详情
 * @param {object} data 
 * @returns {object}
 */
export function housetypeGetOne (data) {
    return request({
        url: '/housetype/info/getOne',
        method: 'post',
        data
    })
}



/**
 * 修改户型记录
 * @param {object} data 
 * @returns {object}
 */
export function housetypeModifyOne (data) {
    return request({
        url: '/housetype/info/modifyOne',
        method: 'post',
        data
    })
}

/**
 * 查询所有户型(联动查询,根据社区+楼栋+单元 查询户型)
 * @param {object} data 
 * @returns {object}
 */
export function allHousetypeList (data) {
    return request({
        url: '/housetype/info/getHouseTypeList',
        method: 'post',
        data
    })
}

/**
 * 房屋新增
 * @param {object} data 
 * @returns {object}
 */
export function houseAddOne (data) {
    return request({
        url: '/house/info/addOne',
        method: 'post',
        data
    })
}

/**
 * 房屋获取详情
 * @param {object} data 
 * @returns {object}
 */
export function houseGetOne (data) {
    return request({
        url: '/house/info/getOne',
        method: 'post',
        data
    })
}

/**
 * 房屋修改记录
 * @param {object} data 
 * @returns {object}
 */
export function houseModifyOne (data) {
    return request({
        url: '/house/info/modifyOne',
        method: 'post',
        data
    })
}

/**
 * 房屋查询所有数据
 * @param {object} data 
 * @returns {object}
 */
export function allHouseInfoList (data) {
    return request({
        url: '/house/info/getHouseInfoList',
        method: 'post',
        data
    })
}

/**
 * 房屋分页查询数据
 * @param {object} data 
 * @returns {object}
 */
export function housePagelist (data) {
    return request({
        url: '/house/info/pageList',
        method: 'post',
        data
    })
}

/**
 * 房屋删除记录
 * @param {object} data 
 * @returns {object}
 */
export function houseDelete (data) {
    return request({
        url: '/house/info/delete',
        method: 'post',
        data
    })
}

/**
 * 业主新增记录
 * @param {object} data 
 * @returns {object}
 */
export function householderAddOne (data) {
    return request({
        url: '/householder/info/addOne',
        method: 'post',
        data
    })
}

/**
 * 业主删除记录
 * @param {object} data 
 * @returns {object}
 */
export function householderDelete (data) {
    return request({
        url: '/householder/info/delete',
        method: 'post',
        data
    })
}

/**
 * 业主获取详情
 * @param {object} data 
 * @returns {object}
 */
export function householderGetOne (data) {
    return request({
        url: '/householder/info/getOne',
        method: 'post',
        data
    })
}
/**
 * 修改业主信息状态
 * @param {object} data 
 * @returns {object}
 */
export function householderEditState (data) {
    return request({
        url: '/householder/info/editState',
        method: 'post',
        data
    })
}

/**
 * 业主分页查询数据
 * @param {object} data 
 * @returns {object}
 */
export function householderPagelist (data) {
    return request({
        url: '/householder/info/pageList',
        method: 'post',
        data
    })
}

/**
 * 业主查询所有数据
 * @param {object} data 
 * @returns {object}
 */
export function allHouseHolderTypeList (data) {
    return request({
        url: '/householder/info/houseHolderTypeList',
        method: 'post',
        data
    })
}

/**
 * 修改业主信息
 * @param {object} data 
 * @returns {object}
 */
export function houseHolderModifyOne (data) {
    return request({
        url: '/householder/info/modifyOne',
        method: 'post',
        data
    })
}

/**
 * 民族 列表
 * @param {object} data 
 * @returns {object}
 */
export function allNationsList (data) {
    return request({
        url: '/householder/info/getAllNations',
        method: 'post',
        data
    })
}

/**
 * 楼栋上传文件后批量插入
 * @param {object} data 
 * @returns {object}
 */
export function communityUploadAndInsert (data) {
    return request({
        url: '/community/info/uploadAndInsert',
        method: 'post',
        data: json2form(data)
    })
}

/**
 * 楼栋上传文件后批量插入
 * @param {object} data 
 * @returns {object}
 */
export function buildingUploadAndInsert (data) {
    return request({
        url: '/building/info/uploadAndInsert',
        method: 'post',
        data: json2form(data)
    })
}

/**
 * 房屋上传文件后批量插入
 * @param {object} data 
 * @returns {object}
 */
export function houseUploadAndInsert (data) {
    return request({
        url: '/house/info/uploadAndInsert',
        method: 'post',
        data: json2form(data)
    })
}

/**
 * 户型上传文件后批量插入
 * @param {object} data 
 * @returns {object}
 */
export function housetypeUploadAndInsert (data) {
    return request({
        url: '/housetype/info/uploadAndInsert',
        method: 'post',
        data: json2form(data)
    })
}

/**
 * 业主上传文件后批量插入
 * @param {object} data 
 * @returns {object}
 */
export function householderUploadAndInsert (data) {
    return request({
        url: '/householder/info/uploadAndInsert',
        method: 'post',
        data: json2form(data)
    })
}

/**
 * 单元上传文件后批量插入
 * @param {object} data 
 * @returns {object}
 */
export function unitUploadAndInsert (data) {
    return request({
        url: '/unit/info/uploadAndInsert',
        method: 'post',
        data: json2form(data)
    })
}

/**
 * 公共区域上传文件后批量插入
 * @param {object} data 
 * @returns {object}
 */
export function regionUploadAndInsert (data) {
    return request({
        url: 'region/info/uploadAndInsert',
        method: 'post',
        data: json2form(data)
    })
}


/**
 * 公共区域新增记录
 * @param {object} data 
 * @returns {object}
 */
export function regionAddOne (data) {
    return request({
        url: '/region/info/addOne',
        method: 'post',
        data
    })
}

/**
 * 公共区域新增记录
 * @param {object} data 
 * @returns {object}
 */
export function regionDelete (data) {
    return request({
        url: '/region/info/delete',
        method: 'post',
        data
    })
}

/**
 * 公共区域获取详情
 * @param {object} data 
 * @returns {object}
 */
export function regionGetOne (data) {
    return request({
        url: '/region/info/getOne',
        method: 'post',
        data
    })
}

/**
 * 公共区域修改记录
 * @param {object} data 
 * @returns {object}
 */
export function regionModifyOne (data) {
    return request({
        url: '/region/info/modifyOne',
        method: 'post',
        data
    })
}

/**
 * 公共区域列表
 * @param {object} data 
 * @returns {object}
 */
export function regionPagelist (data) {
    return request({
        url: '/region/info/pageList',
        method: 'post',
        data
    })
}

/**
 * 设备管理新增
 * @param {object} data 
 * @returns {object}
 */
export function deviceAddOne (data) {
    return request({
        url: '/device/info/addOne',
        method: 'post',
        data
    })
}

/**
 * 设备管理删除
 * @param {object} data 
 * @returns {object}
 */
export function deviceDelete (data) {
    return request({
        url: '/device/info/delete',
        method: 'post',
        data
    })
}

/**
 * 设备管理修改
 * @param {object} data 
 * @returns {object}
 */
export function deviceModifyOne (data) {
    return request({
        url: '/device/info/modifyOne',
        method: 'post',
        data
    })
}

/**
 * 设备管理分页查询
 * @param {object} data 
 * @returns {object}
 */
export function devicePagelist (data) {
    return request({
        url: '/device/info/findCommunityDevList',
        method: 'post',
        data
    })
}

/**
 * 删除门禁信息
 * @param {object} data 
 * @returns {object}
 */
export function deleteEntranceGuardInfo (data) {
    return request({
        url: '/entranceGuard/info/deleteEntranceGuardInfo',
        method: 'post',
        data
    })
}


/**
 * 查询子账号
 * @param {object} data 
 * @returns {object}
 */
export function findSubAccountPagelist (data) {
    return request({
        url: '/userinfo/findSubAccount',
        method: 'post',
        data
    })
}

/**
 * 删除子账号
 * @param {object} data 
 * @returns {object}
 */
export function deleteSubAccount (data) {
    return request({
        url: '/userinfo/deleteSubAccount',
        method: 'post',
        data
    })
} 

/**
修改社区设备品牌 
 * @param {object} data 
 * @returns {object}
 */
export function updateCommunityBrand (data) {
    return request({
        url: '/community/info/updateCommunityBrand',
        method: 'post',
        data
    })
} 