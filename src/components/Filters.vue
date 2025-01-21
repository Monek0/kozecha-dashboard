<template>
    <v-container class="filter-container">
      <v-row>
        <!-- Selector de Temporada -->
        <v-col cols="12" sm="4" md="2" lg="2">
          <v-select
            v-model="selectedSeason" 
            :items="seasons"
            label="Temporada"
            outlined
            class="filter-select"
            required
          ></v-select>
        </v-col>
  
        <!-- Selector de Tipo de Proceso -->
        <v-col cols="12" sm="4" md="2" lg="2">

          <v-select
            v-model="selectedProcess" 
            :items="processes"
            label="Tipo de Proceso"
            outlined
            class="filter-select"
          ></v-select>
        </v-col>
  
        <!-- Selector de Rango de Fechas -->
        <v-col cols="12" sm="4" md="2" lg="2">

            <v-menu
                v-model="menu"
                :close-on-content-click="false"
                transition="scale-transition"
                max-width="290"
                min-width="290"
            >
                <template v-slot:activator="{ props }">
                    <v-text-field
                        v-model="formattedDates"
                        label="Rango de Fechas"
                        readonly
                        v-bind="props"
                        outlined
                        class="filter-select"
                    ></v-text-field>
                </template>
                <v-date-picker
                    v-model="selectedDates"
                    range
                    scrollable
                ></v-date-picker>
            </v-menu>
        </v-col>
  
        <!-- Selector de Variedad -->
        <v-col cols="12" sm="4" md="2" lg="2">

          <v-autocomplete
            v-model="selectedVarieties" 
            :items="varieties"
            label="Variedad"
            multiple
            outlined
            class="filter-select"
          ></v-autocomplete>
        </v-col>
  
        <!-- Selector de Productor -->
        <v-col cols="12" sm="4" md="2" lg="2">

          <v-autocomplete
            v-model="selectedProducers" 
            :items="producers"
            label="Productor"
            multiple
            outlined
            class="filter-select"
          ></v-autocomplete>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, computed } from 'vue';
  import { useFiltersStore } from '../stores/filters'; // Importa el store de filtros
  
  export default defineComponent({
    name: 'Filters',
    setup() {
      const filtersStore = useFiltersStore(); // Accede al store de filtros
  
      // Datos para los selectores
      const seasons = ref(['2023/2024', '2024/2025', '2025/2026']);
      const processes = ref(['Pre-cosecha', 'Cosecha', 'Post-cosecha']);
      const varieties = ref(['Fuji', 'Gala', 'Pink Lady']);
      const producers = ref(['Productor 1', 'Productor 2', 'Productor 3']);
  
      // Conexión con el estado global usando computed
      const selectedSeason = computed({
        get: () => filtersStore.selectedSeason,
        set: (value) => filtersStore.setSeason(value),
      });
  
      const selectedProcess = computed({
        get: () => filtersStore.selectedProcess,
        set: (value) => filtersStore.setProcess(value),
      });
  
      const selectedDates = computed({
        get: () => filtersStore.selectedDates,
        set: (value) => filtersStore.setDates(value),
      });
  
      const selectedVarieties = computed({
        get: () => filtersStore.selectedVarieties,
        set: (value) => filtersStore.setVarieties(value),
      });
  
      const selectedProducers = computed({
        get: () => filtersStore.selectedProducers,
        set: (value) => filtersStore.setProducers(value),
      });
  
      // Control del menú del selector de fechas
      const menu = ref(false);
  
      // Manejo de formato de fechas
      const formattedDates = computed(() =>
        selectedDates.value.start && selectedDates.value.end
          ? `${selectedDates.value.start} - ${selectedDates.value.end}`
          : ''
      );
  
      return {
        seasons,
        processes,
        varieties,
        producers,
        selectedSeason,
        selectedProcess,
        selectedDates,
        formattedDates,
        selectedVarieties,
        selectedProducers,
        menu,
      };
    },
  });
  </script>
  