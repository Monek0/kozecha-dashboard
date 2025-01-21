<template>
  <div id="app">
    <Filters />
    <KPIs />
  </div>
</template>

<script>
import Filters from './components/Filters.vue';
import KPIs from './components/KPIs.vue';
import Chart from './components/Chart.vue';

export default {
  components: { 
    Filters,
    KPIs,
    Chart
  },
};
</script>
