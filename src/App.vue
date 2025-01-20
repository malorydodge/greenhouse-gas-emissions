<template>
  <div id="app">
    <h3 class="text-center text-2xl font-bold text-gray-900 sm:truncate sm:tracking-tight">
      Greenhouse Gas Emissions
    </h3>
    <b-card no-body>
      <Filters @yearFilterUpdated="updateYearFilter" @countryFilterUpdated="updateCountryFilter" />

      <div v-if="!checkFilters">
        Please select at least one year and one country to display data
      </div>
      <b-tabs v-else card>
        <b-tab title="Graphs" active>
          <div v-if="!isLoading">
            <div class="p-4">
              <LineChart :data="data" :filters="selectedFilters" />
            </div>
            <div class="flex p-4">
              <BarChart :data="data" :filters="selectedFilters" />
              <PieChart :data="data" :filters="selectedFilters" />
            </div>
          </div>
          <b-spinner v-else variant="success"></b-spinner>
        </b-tab>
        <b-tab title="Table">
          <DataTable v-if="!isLoading" :data="data" :selectedFilters="selectedFilters" />
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
import axios from 'axios'
export default {
  name: 'App',
  components: {
    LineChart,
    DataTable,
    BarChart,
    PieChart,
    Filters,
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
  computed: {
    checkFilters() {
      console.log(this.selectedFilters['years'])

      return this.selectedFilters.years.length > 0 && this.selectedFilters?.countries?.length > 0
    },
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
