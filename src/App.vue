<template>
  <div>
    <b-card no-body>
      <b-tabs card>
        <b-tab title="Table" active>
          <b-card-text><b-table striped hover :items="items"></b-table></b-card-text>
        </b-tab>
        <b-tab title="Graph" active>
          <Line :data="data" />
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'vue-chartjs'
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)
export default {
  name: 'App',
  components: {
    Line,
  },
  data() {
    return {
      items: [
        { age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
        { age: 21, first_name: 'Larsen', last_name: 'Shaw' },
        { age: 89, first_name: 'Geneva', last_name: 'Wilson' },
        { age: 38, first_name: 'Jami', last_name: 'Carney' },
      ],
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: [40, 39, 10, 40, 39, 80, 40],
          },
        ],
      },
    }
  },
  created() {},
}
</script>

<style scoped></style>
