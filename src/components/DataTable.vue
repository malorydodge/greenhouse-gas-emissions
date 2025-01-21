<template>
  <div>
    <b-pagination
      v-model="currentPage"
      :total-rows="data.length"
      :per-page="20"
      aria-controls="my-table"
    ></b-pagination>
    <b-card-text
      ><b-table
        striped
        hover
        :items="data"
        :fields="fields"
        :perPage="20"
        :currentPage="currentPage"
      ></b-table
    ></b-card-text>
  </div>
</template>
<script>
export default {
  name: 'DataTable',
  components: {},
  props: {
    data: Array,
  },
  data() {
    return {
      currentPage: 1,
      fields: [
        {
          key: 'country.value',
          label: 'Country',
          sortable: true,
        },
        {
          key: 'date',
          label: 'Year',
          sortable: true,
        },
        {
          key: 'value',
          label: 'Emissions (kilotons)',
          sortable: true,
        },
      ],
    }
  },
}
</script>
<style></style>
