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
import { mapGetters } from 'vuex'
ChartJS.register(ArcElement, Tooltip, Legend)
export default {
  name: 'PieChart',
  components: {
    Pie,
  },
  props: {
    data: Array,
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
      // Format data for chartjs requirements
      let formattedData = {
        labels: this.selectedFilters.countries,
        datasets: [
          {
            backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16', '#094342', '#567321'],
            data: this.getTotalEmissions(),
          },
        ],
      }
      return formattedData
    },
    // mix the getters into computed with object spread operator
    ...mapGetters(['selectedFilters']),
  },
  methods: {
    getTotalEmissions() {
      let totals = []
      for (let countryIndex in this.selectedFilters.countries) {
        let countryCode = this.selectedFilters.countries[countryIndex]
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
