<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item label="搜索设备">
					<el-input v-model="filters.keyword"  size="medium" placeholder=""></el-input>
				</el-form-item>
				<el-form-item label="搜索日期">
					<div class="block"> 
						<el-date-picker
						v-model="filters.repairTime"
						@change="getSTime"
						type="datetimerange"
						range-separator="至"
						value-format=" yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm"
						start-placeholder="开始日期"
						end-placeholder="结束日期">
						</el-date-picker>
					</div> 
				</el-form-item>
				<el-form-item label="搜索地址">
					<el-input v-model="filters.keyword"  size="medium" placeholder=""></el-input>
				</el-form-item> 
				<el-form-item>
					<el-button type="primary" size="small" v-on:click="handleGetPopulationManagementLists">查询</el-button>
				</el-form-item> 
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="communitylist" highlight-current-row v-loading="listLoading"  row-class-name="main_class" header-row-class-name="main_class" style="width: 100%; ">
			<!-- <el-table-column type="selection" width="55">
			</el-table-column>  -->
			<el-table-column prop="id"  label="设备编号" width="180" >
			</el-table-column>
			<el-table-column prop="name"  label="设备" width="200"  >
			</el-table-column>
			<el-table-column prop="lv" label="告警等级" width="180" >
			</el-table-column>
			<el-table-column prop="stats" label="告警类型" width="180" >
			</el-table-column>
			<el-table-column   prop="time" label="发生时间" min-width="180" >
			</el-table-column>
            <el-table-column   prop="address" label="位置" min-width="180" >
			</el-table-column>
            <el-table-column   prop="byStats" label="处理状态" min-width="180" >
			</el-table-column>
			<el-table-column label="操作" width="250">
				<template slot-scope="scope">
					<el-button type="primary" size="small"  >处理</el-button> 
					<el-button type="danger"  size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar"> 
			<el-pagination layout="total,prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

		 

		 
	</section>
</template>

<script>
	var vueEle;  
	import { } from '../../api/user';
 
	export default {
		data() {
			vueEle = this;
		 
			return {
				filters: {
					keyword: ''
				},
				users: [],
				total: 0,
				page: 1,
				listLoading: false,
				sels: [],//列表选中列   
				 
				addLoading: false,
				  
				communityAuthorityBO:'',		 
				communitylist:[
                    {
                        id:"2312",
                        name:"门禁",
                        lv:"A",
                        stats:"未关闭",
                        time:"2019-07-04  10：52：30",
                        address:"广佛颐景园小区6栋",
                        byStats:"未处理" 
                        },
                        {
                        id:"312",
                        name:"监控",
                        lv:"B",
                        stats:"掉线",
                        time:"2019-07-06  10：52：30",
                        address:"广佛颐景园小区游乐场",
                        byStats:"未处理" 
                        },
                        {
                        id:"412",
                        name:"门禁",
                        lv:"C",
                        stats:"未关闭",
                        time:"2019-07-24  10：52：30",
                        address:"广佛颐景园小区游泳池",
                        byStats:"处理" 
                        },
                ]

			}
		},
		beforeMount() { 
			 
		},
		methods: {
			getSTime(val) {
				vueEle.filters.repairTime = val;
				console.log(vueEle.filters.repairTime)
			}, 
		 
			handleCurrentChange(val) { 
				vueEle.page = val;
				vueEle.getPopulationManagementLists();
			},
			//查询
			handleGetPopulationManagementLists() {
				vueEle.page = 1;
				vueEle.getPopulationManagementLists();
			},
			//获取流管办列表
			getPopulationManagementLists() { 

			},
			//删除
			handleDel: function (index, row) {
				vueEle.$confirm('确认删除该记录吗?', '提示', {
					cancelButtonClass:'el-button--success',
					type: 'warning'
				}).then(() => { 

				}).catch(() => {

				});
			},
			 
			  
		},
		mounted() {
			
			vueEle.getPopulationManagementLists();
		}
	}

</script>

<style scoped>
.xin{
	border-bottom: 1px solid #f4f4f5
}

.el-table .main_class{
    background:rgba(0,0,0,0);
    background:transparent;
	color:#ffffff;
}
.el-table{
    width: 100%;
    background: transparent;
}
 
</style>