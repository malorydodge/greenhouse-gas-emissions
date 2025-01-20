import './assets/main.css'

import { createApp, configureCompat } from 'vue'
import App from './App.vue'
import DataTable from './components/DataTable.vue'
import LineChart from './components/LineChart.vue'
import BarChart from './components/BarChart.vue'
import PieChart from './components/PieChart.vue'
import Filters from './components/Filters.vue'
import OverviewStatistics from './components/OverviewStatistics.vue'
import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import './index.css'

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
app.component('DataTable', DataTable)
app.component('LineChart', LineChart)
app.component('BarChart', BarChart)
app.component('PieChart', PieChart)
app.component('Filters', Filters)
app.component('OverviewStatistics', OverviewStatistics)
app.mount('#app')
