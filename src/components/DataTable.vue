<template lang="">
  <div>
    <b-card-text><b-table striped hover :items="data"></b-table></b-card-text>
  </div>
</template>
<script>
export default {
  name: 'DataTable',
  components: {},
  props: {
    data: Array,
    filters: Object,
  },
}
</script>
<style lang=""></style>
