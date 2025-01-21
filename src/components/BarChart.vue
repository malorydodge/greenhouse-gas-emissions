<template>
  <div class="w-4/6">
    <h3 class="text-lg font-bold text-gray-900 sm:truncate sm:tracking-tight">
      Greenhouse Gas Emissions by Year
    </h3>
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
import { mapGetters } from 'vuex'
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)
export default {
  name: 'BarChart',
  components: {
    Bar,
  },
  props: {
    data: Array,
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
      let years = this.selectedFilters.years
      let formattedData = {
        labels: years.sort((a, b) => a - b),
        datasets: [],
      }
      for (let country in this.selectedFilters.countries) {
        let countryCode = this.selectedFilters.countries[country]
        formattedData.datasets.push({
          label: countryCode,
          backgroundColor: '#' + Math.floor(country * 999).toString(16),
          data: this.data[countryCode],
        })
      }
      return formattedData
    },
    // mix the getters into computed with object spread operator
    ...mapGetters(['selectedFilters']),
  },
}
</script>
<style></style>
