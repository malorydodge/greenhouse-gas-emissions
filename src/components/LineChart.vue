<template>
  <div>
    <h3 class="text-lg font-bold text-gray-900 sm:truncate sm:tracking-tight">
      Greenhouse Gas Emissions by Year
    </h3>
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
      // Format data for chartjs requirements
      let years = this.filters.years
      let formattedData = {
        labels: years.sort((a, b) => a - b),
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
<style></style>
