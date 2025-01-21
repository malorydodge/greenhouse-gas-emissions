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
      <div class="p-2">Select a single year or click and drag to highlight a group of years</div>
      <b-form-select
        v-model="selectedYears"
        :options="yearOptions"
        multiple
        :select-size="50"
        class="year-select"
      ></b-form-select>
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
      selectedCountries: [],
      selectedYears: [],
      yearOptions: Array.from({ length: 50 }, (_, i) => `${2024 - i}`),
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
    this.selectedCountries = this.selectedFilters.countries
    this.selectedYears = this.selectedFilters.years
  },
  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters(['selectedFilters']),
  },
  methods: {
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
      this.setYearFilter(newValue)
      this.$emit('filterUpdated', newValue)
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
      this.$emit('filterUpdated', newValue)
    },
  },
}
</script>
<style>
.filters .dropdown-menu {
  max-height: 200px;
  overflow-y: auto;
}
.year-select {
  max-height: 100px;
}
</style>
