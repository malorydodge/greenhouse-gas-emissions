<template>
  <div id="app">
    <b-card no-body>
      <OverviewStatistics />
      <Filters @yearFilterUpdated="updateYearFilter" @countryFilterUpdated="updateCountryFilter" />
      <b-tabs card>
        <b-tab title="Table" active>
          <DataTable :data="data" :selectedFilters="selectedFilters" />
        </b-tab>
        <b-tab title="Graphs" active>
          <LineChart :data="data" :filters="selectedFilters" />
          <BarChart :data="data" :selectedFilters="selectedFilters" />
          <PieChart />
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
      selectedFilters: {
        years: [],
        countries: [],
      },
    }
  },
  created() {},
  computed: {
    filteredData() {
      return this.data
    },
  },
  methods: {
    updateYearFilter(selectedYears) {
      this.selectedFilters.years = selectedYears
    },
    updateCountryFilter(selectedCountries) {
      this.selectedFilters.countries = selectedCountries
    },
  },
}
</script>

<style scoped></style>
