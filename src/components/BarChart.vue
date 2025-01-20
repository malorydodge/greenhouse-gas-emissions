<template lang="">
  <div>
    <Bar :data="formattedData" :options="options" />
  </div>
</template>
<script>
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'
import { Bar } from 'vue-chartjs'
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)
export default {
  name: 'BarChart',
  components: {
    Bar,
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
