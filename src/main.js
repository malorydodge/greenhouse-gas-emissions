import './index.css'

import { createApp, configureCompat } from 'vue'
import App from './App.vue'
import DataTable from './components/DataTable.vue'
import LineChart from './components/LineChart.vue'
import BarChart from './components/BarChart.vue'
import PieChart from './components/PieChart.vue'
import Filters from './components/Filters.vue'
import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
  state() {
    return {
      selectedFilters: {
        years: Array.from({ length: 48 }, (_, i) => `${2022 - i}`),
        countries: ['USA', 'JPN', 'CHN', 'IND', 'FRA', 'BRA'],
      },
    }
  },
  getters: {
    selectedFilters(state) {
      return state.selectedFilters
    },
  },
  mutations: {
    setYearFilter(state, selectedYears) {
      state.selectedFilters.years = selectedYears
    },
    setCountryFilter(state, selectedCountries) {
      state.selectedFilters.countries = selectedCountries
    },
  },
})

configureCompat({
  WATCH_ARRAY: 'suppress-warning',
  RENDER_FUNCTION: 'suppress-warning',
  INSTANCE_LISTENERS: 'suppress-warning',
  COMPONENT_FUNCTIONAL: 'suppress-warning',
  OPTIONS_BEFORE_DESTROY: 'suppress-warning',
  INSTANCE_SCOPED_SLOTS: 'suppress-warning',
  OPTIONS_DATA_MERGE: 'suppress-warning',
  COMPONENT_V_MODEL: 'suppress-warning',
  CUSTOM_DIR: 'suppress-warning',
  INSTANCE_EVENT_EMITTER: 'suppress-warning',
  ATTR_FALSE_VALUE: 'suppress-warning',
  INSTANCE_ATTRS_CLASS_STYLE: 'suppress-warning',
  GLOBAL_PROTOTYPE: 'suppress-warning',
  GLOBAL_EXTEND: 'suppress-warning',
  GLOBAL_MOUNT: 'suppress-warning',
  OPTIONS_DESTROYED: 'suppress-warning',
  INSTANCE_DESTROY: 'suppress-warning',
})
const app = createApp(App)
app.use(BootstrapVue)
app.use(store)
app.component('DataTable', DataTable)
app.component('LineChart', LineChart)
app.component('BarChart', BarChart)
app.component('PieChart', PieChart)
app.component('Filters', Filters)
app.mount('#app')
