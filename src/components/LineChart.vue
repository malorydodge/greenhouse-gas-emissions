<template lang="">
  <div>
    <Line :data="formattedData" />
  </div>
</template>
<script>
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js'
import { Line } from 'vue-chartjs'
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement)
export default {
  name: 'LineChart',
  components: {
    Line,
  },
  props: {
    data: Array,
    filters: Object,
  },
  data() {
    return {
      formattedData: {
        labels: this.filters.years,
        datasets: [
          {
            label: 'Total Emissions by Country',
            backgroundColor: '#f87979',
            data: this.data,
          },
        ],
      },
    }
  },
  created() {},
}
</script>
<style lang=""></style>
