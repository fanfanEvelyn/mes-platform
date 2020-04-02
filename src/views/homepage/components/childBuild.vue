
<template>
  <div>
    <el-row
      :gutter="20"
      class="p10"
    >
      <el-col
        :span="6"
        v-for="item in buildingcountAllList"
        :key="item.id"
      >
        <div class="grid-content   content-box">
          <div class=" content-box-text">
            {{item.buildingName}}
          </div>
          <span class="content-box-img">
            <img
              src="/images/builds.png"
              alt=""
            >
          </span>
          <el-row class="content-box-bottom">
            <el-col :span="8">
              房屋数量：{{item.houseCount||"0"}}
            </el-col>
            <el-col :span="8">
              绑定人数：{{item.holderCount||"0"}}
            </el-col>
            <el-col :span="8">
              设备数量：{{item.deviceCount||"0"}}
            </el-col>
          </el-row>

        </div>
      </el-col>
    </el-row> 

    <!--工具条-->
    <el-pagination 
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[10, 20, 30, 40, 50]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      v-if="buildingcountAllList!=''"
    ></el-pagination> 

    <!-- <el-col
      :span="24"
      class="toolbar"
      v-if="buildingcountAllList!=''"
    >
      <el-pagination
        layout="total,prev, pager, next"
        @current-change="handleCurrentChange"
        :page-size="10"
        :total="total"
        style="float:right;"
      >
      </el-pagination>
    </el-col> -->

  </div>
</template>

<script>
var vueEle;
import { buildingCountAll } from '@/api/user.js';
export default {
  name: 'childBuild',
  props: ['communityId'],
  data () {
    vueEle = this;
    return {
      total: 0, // 条目总数
      page: 1, // 当前页码
      pageSize: 10, // 页面大小
      buildingcountAllList: '', 
      communityId0: ''
    }
  },
  methods: {
    //根据社区ID,查询所有的楼栋下的 房屋，绑定人数等数量信息
    getBuildingCountAllList (value) {
      let para = {
        page: vueEle.page,
        rows: vueEle.pageSize,
        communityId: value 
      };
      buildingCountAll(para).then((res) => {
        if (res.code == 10000) {
          vueEle.buildingcountAllList = res.data.list;
          vueEle.total = res.data.total;
        } else {
          vueEle.$message({
            message: res.msg,
            type: 'error'
          });

        }
      })
    },
    /**
     * 分页相关
     */
    // 页面大小改变事件响应
    handleSizeChange: function(e) {
      vueEle.page = 1;
      vueEle.pageSize = e;
      vueEle.getBuildingCountAllList(vueEle.communityId0);
    },
    handleCurrentChange (val) {
      // console.log(val)
      vueEle.page = val;
      vueEle.getBuildingCountAllList(vueEle.communityId0);
    },
  },
  watch: {
    communityId: function (data) {//监听属性变化\
      vueEle.communityId0 = data;
      vueEle.getBuildingCountAllList(data);
    }
  }
}
</script>

<style scoped lang="scss">
.welcome {
  .el-row {
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
    margin-bottom: 20px;
  }
  .bg-purple {
    background: #f3f3f9;
    border: #ccc 1px solid;
  }
  .i-big {
    width: 80px;
    font-size: 64px;
    float: left;
  }
  .i-min {
    width: 50px;
    font-size: 48px;
    float: left;
  }

  .content-box {
    border: #ccc 1px solid;
    height: 120px;
    font-size: 14px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.19);
    border-radius: 3px;
    position: relative;
  }
  .m-bottom {
    margin-bottom: 20px;
  }
  .f-box {
    float: left;
    padding: 10px 10px 20px;
  }
  .p-left {
    padding-left: 20px;
  }
  .f-right {
    text-align: right;
  }
  .b-left {
    float: left;
  }
  .content-box-text {
    border-left: #ed6c2c 5px solid;
    margin-top: 20px;
    margin-bottom: 20px;
    padding: 5px 20px;
    font-size: 24px;
  }
  .content-box-img {
    position: absolute;
    right: 20px;
    top: 15px;
  }
  .content-box-bottom {
    border-top: #f3f3f3 1px solid;
    padding-left: 10px;
    padding-top: 10px;
  }
  .p10 {
    padding: 10px 10px 0;
  }
}
</style>