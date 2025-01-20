<template>
  <div id="app">
    <h3 class="text-center text-2xl font-bold text-gray-900 sm:truncate sm:tracking-tight">
      Greenhouse Gas Emissions
    </h3>
    <b-card no-body>
      <div class="text-center">
        <div class="bg-white p-2 text-gray-400">
          <b-dropdown
            variant="outline-primary"
            id="country-filter"
            text="Countries"
            class="mt-4 p-2 filters"
          >
            <b-form-checkbox :checked="allCountriesSelected" @change="toggleAllCountries">
              {{ allCountriesSelected ? 'Un-select All' : 'Select All' }}
            </b-form-checkbox>
            <b-form-checkbox-group
              v-model="selectedFilters.countries"
              :options="countryOptions"
              class="mb-3"
              value-field="value"
              text-field="label"
              disabled-field="notEnabled"
            ></b-form-checkbox-group>
          </b-dropdown>
          <b-dropdown
            variant="outline-primary"
            id="year-filter"
            text="Years"
            class="mt-4 p-2 filters"
          >
            <b-form-checkbox :checked="allYearsSelected" @change="toggleAllYears">
              {{ allYearsSelected ? 'Un-select All' : 'Select All' }}
            </b-form-checkbox>
            <b-form-checkbox-group
              v-model="selectedFilters.years"
              :options="yearOptions"
              class="mb-3"
              disabled-field="notEnabled"
            ></b-form-checkbox-group>
          </b-dropdown>
        </div>
      </div>

      <div v-if="!checkFilters">
        <b-alert show variant="danger">
          Please select at least one year and one country to display data</b-alert
        >
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
          <DataTable
            v-if="!isLoading"
            :data="tableData"
            :selectedFilters="selectedFilters"
            :perPage="20"
          />
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
import axios from 'axios'
import { watch } from 'vue'
export default {
  name: 'App',
  components: {
    LineChart,
    DataTable,
    BarChart,
    PieChart,
  },
  data() {
    return {
      data: [],
      tableData: [],
      isLoading: true,
      // The following fields have hard-coded default values due to formatting requirements
      yearOptions: Array.from({ length: 50 }, (_, i) => `${2024 - i}`),
      countryOptions: [
        { label: 'United States', value: 'USA' },
        { label: 'Japan', value: 'JPN' },
        { label: 'China', value: 'CHN' },
        { label: 'India', value: 'IND' },
        { label: 'France', value: 'FRA' },
        { label: 'Brazil', value: 'BRA' },
      ],
      selectedFilters: {
        years: Array.from({ length: 50 }, (_, i) => `${2024 - i}`),
        countries: ['USA', 'JPN', 'CHN', 'IND', 'FRA', 'BRA'],
      },
    }
  },
  computed: {
    checkFilters() {
      return this.selectedFilters?.years?.length > 0 && this.selectedFilters?.countries?.length > 0
    },
    allCountriesSelected() {
      return this.selectedFilters?.countries?.length === this.countryOptions.length
    },
    allYearsSelected() {
      return this.selectedFilters?.years?.length === this.yearOptions.length
    },
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
    toggleAllYears(checkedYears) {
      // Set selected years to all years
      this.selectedFilters.years = checkedYears
        ? // Extract values from options array
          this.yearOptions
        : []
    },
    toggleAllCountries(checkedCountries) {
      // Set selected countries to all countries
      this.selectedFilters.countries = checkedCountries
        ? // Extract values from options array
          Array.from(this.countryOptions, (option) => option.value)
        : []
    },
    watch: {
      // Trigger api call to refresh data on filter change
      async selectedFilters() {
        await this.getEmissionsData()
      },
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
