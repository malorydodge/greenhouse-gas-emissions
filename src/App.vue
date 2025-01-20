<template>
  <div id="app">
    <b-card no-body>
      <OverviewStatistics />
      <Filters @yearFilterUpdated="updateYearFilter" @countryFilterUpdated="updateCountryFilter" />
      <b-tabs card>
        <b-tab title="Table" active>
          <DataTable v-if="!isLoading" :data="data" :selectedFilters="selectedFilters" />
          <b-spinner v-else variant="success"></b-spinner>
        </b-tab>
        <b-tab title="Graphs" active>
          <div v-if="!isLoading">
            <LineChart :data="data" :filters="selectedFilters" />
            <!-- <BarChart :data="data" :selectedFilters="selectedFilters" />
            <PieChart /> -->
          </div>
          <b-spinner v-else variant="success"></b-spinner>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
import LineChart from './components/LineChart.vue'
import DataTable from './components/DataTable.vue'
import BarChart from './components/BarChart.vue'
import PieChart from './components/PieChart.vue'
import Filters from './components/Filters.vue'
import OverviewStatistics from './components/OverviewStatistics.vue'
import axios from 'axios'
export default {
  name: 'App',
  components: {
    LineChart,
    DataTable,
    BarChart,
    PieChart,
    Filters,
    OverviewStatistics,
  },
  data() {
    return {
      data: [],
      isLoading: true,
      selectedFilters: {
        years: [],
        countries: [],
      },
    }
  },
  async created() {
    await this.getEmissionsData()
  },
  methods: {
    async updateYearFilter(selectedYears) {
      this.selectedFilters.years = selectedYears
      await this.getEmissionsData()
    },
    async updateCountryFilter(selectedCountries) {
      this.selectedFilters.countries = selectedCountries
      await this.getEmissionsData()
    },
    async getEmissionsData() {
      try {
        this.isLoading = true
        // clear current data
        this.data = []
        for (let countryIndex in this.selectedFilters.countries) {
          let countryCode = this.selectedFilters.countries[countryIndex]
          const res = await axios
            .get(
              `https://api.worldbank.org/v2/country/${countryCode}/indicator/EN.GHG.ALL.MT.CE.AR5?format=json`,
            )
            .then((response) => {
              const [metadata, responseData] = response.data
              this.data[countryCode] = this.data.concat(responseData)
            })
        }
        this.isLoading = false
      } catch (err) {
        console.error('Error fetching data:', err)
      }
    },
  },
}
</script>

<style scoped></style>
