<template>
  <div class="w-2/6">
    <h3 class="text-lg font-bold text-gray-900 sm:truncate sm:tracking-tight">
      Total Emissions Per Country
    </h3>
    <Pie :data="formattedData" :options="options" />
  </div>
</template>
<script>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'vue-chartjs'
ChartJS.register(ArcElement, Tooltip, Legend)
export default {
  name: 'PieChart',
  components: {
    Pie,
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
          xAxisKey: 'country',
          yAxisKey: 'value',
        },
      },
    }
  },
  computed: {
    formattedData() {
      let formattedData = {
        labels: this.filters.countries,
        datasets: [
          {
            backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16', '#094342', '#567321'],
            data: this.getTotalEmissions(),
          },
        ],
      }
      console.log(formattedData)
      return formattedData
    },
  },
  methods: {
    getTotalEmissions() {
      let totals = []
      for (let countryIndex in this.filters.countries) {
        let countryCode = this.filters.countries[countryIndex]
        let total = 0
        for (let index in this.data[countryCode]) {
          total += this.data[countryCode][index].value
        }
        totals.push({ country: countryCode, value: total })
      }
      return totals
    },
  },
}
</script>
<style></style>
