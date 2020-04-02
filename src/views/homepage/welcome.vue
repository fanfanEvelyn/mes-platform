<template>
  <div class="welcome">

    <!--工具条-->
    <div class="head-box">物业公司：{{customerName}}，社区数量：{{communityCount||"0"}} 个，商铺：0 个</div>
    <!-- <div class="box">
      <span>小区：</span>
      <el-select
        v-model="filters.communityId "
        placeholder="请选择社区名称"
        style="width:300px;"
        @change="changeCommunity(filters.communityId)"
      >
        <el-option
          v-for="item in communityList"
          :value="item.communityId"
          :key="item.communityId"
          :label="item.communityName"
        > </el-option>
      </el-select>
    </div> -->

    <el-row>
      <el-col :span="4">
        <div class="grid-content bg-purple content1">
          <img src="/images/building.png " alt="" srcset="">
          <!-- <i class="el-icon-office-building i-big"></i> -->
          <div class="content1-right">
            <p class="m-bottom">楼宇</p>
            <p><span class="fs36">{{countAllList.buildingCount||"0"}}</span>栋</p>
          </div>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple content1">
          <img src="/images/house.png " alt="" srcset="">
          <div class="content1-right">
            <p class="m-bottom">房屋</p>
            <p><span class="fs36">{{countAllList.houseCount||"0"}}</span>间</p>
          </div>
        </div>
      </el-col>

      <el-col :span="4">
        <div class="grid-content bg-purple content1">
          <img src="/images/aim.png " alt="" srcset="">
          <div class="content1-right">
            <p class="m-bottom">门禁</p>
            <p><span class="fs36">{{countAllList.entranceCount||"0"}}</span> 个</p>
          </div>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple content1">
          <img src="/images/shopping.png " alt="" srcset="">
          <div class="content1-right">
            <p class="m-bottom">商铺</p>
            <p><span class="fs36">0</span>间</p>
          </div>

        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple content1">
          <img src="/images/view.png " alt="" srcset="">
          <div class="content1-right">
            <p class="m-bottom">监控</p>
            <p><span class="fs36">0</span>个</p>
          </div>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple content1">
          <img src="/images/grid.png " alt="" srcset="">
          <div class="content1-right">
            <p class="m-bottom">车位</p>
            <p><span class="fs36">0</span>个</p>
          </div>
        </div>
      </el-col>
    </el-row>

    <!-- <el-row class="m-bottom">
      <el-col :span="12">
        <div class="grid-content">设备状态预警</div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple-light" style="text-align: right">
          <el-button type="primary" size="small" @click="viewEarlyWarning">查看更多</el-button>
        </div>
      </el-col>
    </el-row> -->
    <!--列表-->
    <!-- <el-table
      :data="apartments"
      highlight-current-row
      v-loading="listLoading"
      style="width: 100%;"
      element-loading-background="rgba(143, 193, 226, 0.2)"
    > 
      <el-table-column prop="id" label="设备编号"></el-table-column>
      <el-table-column prop="name" label="设备"></el-table-column>
      <el-table-column prop="lv" label="告警等级"></el-table-column>
      <el-table-column prop="stats" label="告警类型"></el-table-column>
      <el-table-column prop="time" label="发生时间"></el-table-column>
      <el-table-column prop="address" label="位置"></el-table-column>
      <el-table-column prop="byStats" label="处理状态"></el-table-column>
    </el-table> -->

    <!--工具条-->
    <!-- <el-col :span="24" class="toolbar m-bottom">
      <el-pagination
        layout="total,prev, pager, next"
        @current-change="handleCurrentChange"
        :page-size="pagesize"
        :total="total"
        style="float:right;"
      ></el-pagination>
    </el-col> -->

    <childBuild :communityId="communityId"></childBuild>

  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import childBuild from './components/childBuild.vue'
var vueEle;
import { communityCount, communityCountAll, allCommunityList } from '@/api/user.js';
export default {
  name: 'welcome',
  inject: ['reload'],
  data () {
    vueEle = this;
    return {
      value: new Date(),
      total: 0,
      page: 1,
      filters: {
        communityId: '',
      },
      countAllList: '',
      communityCount: '',
      communityId: '',
      communityList: '',
      buildingcountAllList: '',
      listLoading: false,
      delLoading: false,
      pagesize: 10,
      sels: [], //列表选中列

    };
  },
  components: {
    childBuild
  },

  computed: {
    ...mapGetters(['name', 'customerName', 'community_selected_id']),


  },
  mounted () {
    vueEle.communityId = vueEle.community_selected_id;
    vueEle.getCommunityCount();
    vueEle.getCountAllList();
    //默认选中

  },
  methods: {
    //获取社区数量
    getCommunityCount () {
      communityCount().then((res) => {
        if (res.code == 10000) {
          vueEle.communityCount = res.data;
        } else {
          vueEle.$message({
            message: res.msg,
            type: 'error'
          });

        }
      })
    },
    //查询 所选社区下 所有的楼宇数量,房屋数量,商铺数量,门禁数量,监控数量,车位数量
    getCountAllList () {
      let para = {
        communityId: vueEle.community_selected_id
      };
      communityCountAll(para).then((res) => {
        if (res.code == 10000) {
          vueEle.countAllList = res.data;
        } else {
          vueEle.$message({
            message: res.msg,
            type: 'error'
          });

        }
      })
    },
    // handleCurrentChange(val) { 
    // 	vueEle.page = val;
    // 	vueEle.getBuildingCountAllList(vueEle.communityId);
    // },
    //根据社区ID,查询所有的楼栋下的 房屋，绑定人数等数量信息
    // getBuildingCountAllList(value) {  
    // 	let para = {  
    //     page: vueEle.page,
    // 		size:10,
    //     communityId:value
    // 	}; 
    // 	buildingCountAll(para).then((res) => {
    // 		if (res.code == 10000) {
    // 			vueEle.buildingcountAllList = res.data;
    // 		} else { 
    // 			vueEle.$message({
    // 			message: res.msg,
    // 			type: 'error'
    // 			}); 

    // 		} 
    // 	}) 
    // },
    //获取社区下拉列表
    getCommunityList () {
      allCommunityList().then((res) => {
        if (res.code == 10000) {
          vueEle.communityList = res.data;
          if (vueEle.communityList != '') {
            vueEle.filters.communityId = vueEle.communityList[0].communityId;
            vueEle.changeCommunity(vueEle.filters.communityId)
          }

        } else {
          vueEle.$message({
            message: res.msg,
            type: 'error'
          });

        }
      })
    },
    changeCommunity (info) {
      vueEle.communityId = info;
      vueEle.getCountAllList(info);
      // vueEle.getBuildingCountAllList(info);

    },

    viewEarlyWarning () {
      vueEle.$router.push({ path: '/earlyWarning' });
    },

  }
};
</script>
<style scoped lang="scss">
.welcome {
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple {
    // background: #f3f3f9;
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
  .content1 {
    height: 100px;
    // overflow: hidden;
    padding: 25px 15px;
    font-size: 14px;
  }
  .content1 img {
    float: left;
  }
  .content1-right {
    float: left;
    padding: 10px;
    font-size: 16px;
  }
  .content2 {
    height: 120px;
    overflow: hidden;
    padding: 20px 10px;
    font-size: 14px;
  }
  .m-bottom {
    margin-bottom: 15px;
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
  .mp10 {
    margin: 10px;
  }
  .fs36 {
    font-size: 36px;
    padding-right: 10px;
  }
  .head-box {
    width: calc(100% + 40px);
    margin: -20px 0 0 -20px;
    padding: 10px 0 20px;
    background-color: rgba(238, 238, 238, 1);
  }
  .box {
    margin: 20px 10px 10px;
  }
}
</style>






