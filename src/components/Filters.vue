<template>
  <div class="text-center">
    <div class="bg-white p-2 text-gray-400">
      <b-dropdown
        variant="outline-primary"
        id="country-filter"
        text="Countries"
        class="mt-4 p-2 filters"
      >
        <b-form-checkbox v-model="allCountriesSelected" @change="toggleAllCountries">
          {{ allCountriesSelected ? 'Un-select All' : 'Select All' }}
        </b-form-checkbox>
        <b-form-checkbox-group
          v-model="selectedCountries"
          :options="countryOptions"
          class="mb-3"
          value-field="value"
          text-field="label"
          disabled-field="notEnabled"
        ></b-form-checkbox-group>
      </b-dropdown>
      <b-dropdown variant="outline-primary" id="year-filter" text="Years" class="mt-4 p-2 filters">
        <b-form-checkbox v-model="allYearsSelected" @change="toggleAllYears">
          {{ allYearsSelected ? 'Un-select All' : 'Select All' }}
        </b-form-checkbox>
        <b-form-checkbox-group
          v-model="selectedYears"
          :options="yearOptions"
          class="mb-3"
          value-field="value"
          text-field="label"
          disabled-field="notEnabled"
        ></b-form-checkbox-group>
      </b-dropdown>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'Filters',
  data() {
    return {
      allCountriesSelected: true,
      allYearsSelected: true,
      selectedCountries: [],
      selectedYears: [],
      yearOptions: [],
      countryOptions: [
        { label: 'United States', value: 'USA' },
        { label: 'Japan', value: 'JPN' },
        { label: 'China', value: 'CHN' },
        { label: 'India', value: 'IND' },
        { label: 'France', value: 'FRA' },
        { label: 'Brazil', value: 'BRA' },
      ],
    }
  },
  created() {
    this.setYearOptions()
    this.selectedCountries = this.selectedFilters.countries
    this.selectedYears = this.selectedFilters.years
  },
  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters(['selectedFilters']),
  },
  methods: {
    setYearOptions() {
      var currentYear = new Date().getFullYear()
      for (var i = 1; i <= 50; i++) {
        this.yearOptions.push({ label: currentYear - i, value: currentYear - i })
      }
    },
    toggleAllYears(checkedYears) {
      ;(this.selectedYears = checkedYears
        ? Array.from(this.yearOptions, (option) => option.value)
        : []),
        this.setYearFilter(this.selectedYears)
    },
    toggleAllCountries(checkedCountries) {
      ;(this.selectedCountries = checkedCountries
        ? Array.from(this.countryOptions, (option) => option.value)
        : []),
        this.setCountryFilter(this.selectedCountries)
    },
    ...mapMutations(['setCountryFilter', 'setYearFilter']),
  },
  watch: {
    selectedYears(newValue, oldValue) {
      // When individual year checkbox values change
      if (!newValue || newValue.length === 0) {
        this.allYearsSelected = false
      } else if (newValue.length === this.yearOptions.length) {
        this.allYearsSelected = true
      } else {
        this.allYearsSelected = false
      }
      this.setYearFilter(newValue)
      this.$emit('yearFilterUpdated', newValue)
    },
    selectedCountries(newValue, oldValue) {
      // When individual country checkbox values change
      if (!newValue || newValue.length === 0) {
        this.allCountriesSelected = false
      } else if (newValue.length === this.countryOptions.length) {
        this.allCountriesSelected = true
      } else {
        this.allCountriesSelected = false
      }
      this.setCountryFilter(newValue)
      this.$emit('countryFilterUpdated', newValue)
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
