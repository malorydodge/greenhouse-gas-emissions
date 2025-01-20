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
export default {
  name: 'Filters',
  data() {
    return {
      yearOptions: [],
      selectedYears: [],
      allYearsSelected: true,
      countryOptions: [
        { label: 'United States', value: 'USA' },
        { label: 'Japan', value: 'JPN' },
        { label: 'China', value: 'CHN' },
        { label: 'India', value: 'IND' },
        { label: 'France', value: 'FRA' },
        { label: 'Brazil', value: 'BRA' },
      ],
      selectedCountries: [],
      allCountriesSelected: true,
    }
  },
  created() {
    this.setYearOptions()
    // Extract values from options arrays
    this.selectedCountries = Array.from(this.countryOptions, (option) => option.value)
    this.selectedYears = Array.from(this.yearOptions, (option) => option.value)
  },
  methods: {
    setYearOptions() {
      var currentYear = new Date().getFullYear()
      for (var i = 1; i <= 50; i++) {
        this.yearOptions.push({ label: currentYear - i, value: currentYear - i })
      }
    },
    toggleAllYears(checkedYears) {
      this.selectedYears = checkedYears
        ? // Extract values from options array
          Array.from(this.yearOptions, (option) => option.value)
        : []
    },
    toggleAllCountries(checkedCountries) {
      this.selectedCountries = checkedCountries
        ? // Extract values from options array
          Array.from(this.countryOptions, (option) => option.value)
        : []
    },
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
      this.$emit('yearFilterUpdated', this.selectedYears)
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
      this.$emit('countryFilterUpdated', this.selectedCountries)
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
