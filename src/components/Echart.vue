<template>
  <div :id="id" :style="style"></div>
</template>
<script>
export default {
  name: 'Echart',
  props: {
    id: {
      type: String
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '640px'
    },
    option: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.init()
  },
  computed: {
    style: function() {
      return {
        width: this.width,
        height: this.height
      }
    }
  },
  watch: {
    //观察option的变化
    option: {
      handler(newVal, oldVal) {
        // console.log("监听到绘图数据变化，new options：");
        // console.log(newVal)
        if (this.chart) {
          if (newVal) {
            this.chart.setOption(newVal)
            this.dataLength = newVal.series[0].data.length
          } else {
            this.chart.setOption(oldVal)
          }
        } else {
          this.init()
        }
      },
      deep: true
    }
  },
  methods: {
    /**
     * 图表初始化
     */
    init() {
      this.chart = this.$echarts.init(document.getElementById(this.id))
      this.chart.setOption(this.option)
      window.addEventListener('resize', this.chart.resize)
    }
  }
}
</script>
<style lang="scss" scoped></style>
