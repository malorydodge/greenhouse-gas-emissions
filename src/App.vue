<template>
  <div id="app">
    <h3 class="text-center text-2xl font-bold text-gray-900 sm:truncate sm:tracking-tight">
      Greenhouse Gas Emissions
    </h3>
    <b-card no-body>
      <Filters @filterUpdated="getEmissionsData" />
      <div v-if="!checkFilters">
        <b-alert show variant="danger">
          Please select at least one year and one country to display data</b-alert
        >
      </div>
      <b-tabs v-else card>
        <b-tab title="Graphs" active>
          <div v-if="!isLoading">
            <div class="p-4">
              <LineChart :data="data" />
            </div>
            <div class="flex p-4">
              <BarChart :data="data" />
              <PieChart :data="data" />
            </div>
          </div>
          <b-spinner v-else variant="success"></b-spinner>
        </b-tab>
        <b-tab title="Table">
          <DataTable v-if="!isLoading" :data="tableData" />
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
import { mapGetters } from 'vuex'
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
      tableData: [],
      isLoading: true,
    }
  },
  computed: {
    checkFilters() {
      return this.selectedFilters?.years?.length > 0 && this.selectedFilters?.countries?.length > 0
    },
    // mix the getters into computed with object spread operator
    ...mapGetters([
      'selectedFilters',
      // ...
    ]),
  },
  async created() {
    await this.getEmissionsData()
  },
  methods: {
    async getEmissionsData() {
      try {
        this.isLoading = true
        // Clear current data
        this.data = []
        // Loop through all of currently selected countries
        for (let countryIndex in this.selectedFilters.countries) {
          let countryCode = this.selectedFilters.countries[countryIndex]
          // Call worldbank api
          const res = await axios
            .get(
              `https://api.worldbank.org/v2/country/${countryCode}/indicator/EN.GHG.ALL.MT.CE.AR5?format=json`,
            )
            .then((response) => {
              const [metadata, responseData] = response.data
              let record = {}
              // Array for storing response filtered by date
              let filteredResponse = []
              for (let recordIndex in responseData) {
                record = responseData[recordIndex]
                // Only add the record if the year is selected
                if (this.selectedFilters.years.indexOf(record.date) > -1) {
                  filteredResponse.push(record)
                }
              }
              this.data[countryCode] = this.data.concat(filteredResponse)
              this.tableData = this.tableData.concat(filteredResponse)
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

<style>
.filters .dropdown-menu {
  max-height: 200px;
  overflow-y: auto;
}
</style>
