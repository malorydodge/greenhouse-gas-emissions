<template lang="">
  <div>
    <Line :data="formattedData" :options="options" />
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
      options: {
        responsive: true,
        parsing: {
          xAxisKey: 'date',
          yAxisKey: 'value',
        },
      },
    }
  },
  computed: {
    formattedData() {
      let formattedData = {
        labels: this.filters.years.sort((a, b) => a - b),
        datasets: [],
      }
      for (let country in this.filters.countries) {
        let countryCode = this.filters.countries[country]
        formattedData.datasets.push({
          label: countryCode,
          backgroundColor: '#' + Math.floor(country * 999).toString(16),
          data: this.data[countryCode],
        })
      }
      return formattedData
    },
  },
}
</script>
<style lang=""></style>
