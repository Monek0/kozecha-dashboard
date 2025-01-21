import { defineStore } from 'pinia';

export const useFiltersStore = defineStore('filters', {
  state: () => ({
    selectedSeason: '', // Temporada seleccionada
    selectedProcess: '', // Tipo de proceso seleccionado
    selectedDates: { start: '', end: '' }, // Rango de fechas
    selectedVarieties: [] as string[], // Variedades seleccionadas
    selectedProducers: [] as string[], // Productores seleccionados

    // Datos de ejemplo para gráficos
    inspectionData: [
      // Temporada 2023/2024
      { estado: 'Pendientes', cantidad: 120, temporada: '2023/2024', proceso: 'Pre-cosecha', variedad: 'Fuji', productor: 'Productor 1' },
      { estado: 'Aprobadas', cantidad: 200, temporada: '2023/2024', proceso: 'Pre-cosecha', variedad: 'Fuji', productor: 'Productor 1' },
      { estado: 'Rechazadas', cantidad: 150, temporada: '2023/2024', proceso: 'Pre-cosecha', variedad: 'Fuji', productor: 'Productor 1' },
      { estado: 'Retests', cantidad: 80, temporada: '2023/2024', proceso: 'Pre-cosecha', variedad: 'Fuji', productor: 'Productor 1' },

      { estado: 'Pendientes', cantidad: 100, temporada: '2023/2024', proceso: 'Cosecha', variedad: 'Fuji', productor: 'Productor 1' },
      { estado: 'Aprobadas', cantidad: 250, temporada: '2023/2024', proceso: 'Cosecha', variedad: 'Fuji', productor: 'Productor 2' },
      { estado: 'Rechazadas', cantidad: 120, temporada: '2023/2024', proceso: 'Cosecha', variedad: 'Fuji', productor: 'Productor 3' },
      { estado: 'Retests', cantidad: 70, temporada: '2023/2024', proceso: 'Cosecha', variedad: 'Fuji', productor: 'Productor 1' },

      { estado: 'Pendientes', cantidad: 80, temporada: '2023/2024', proceso: 'Post-cosecha', variedad: 'Fuji', productor: 'Productor 2' },
      { estado: 'Aprobadas', cantidad: 30, temporada: '2023/2024', proceso: 'Post-cosecha', variedad: 'Fuji', productor: 'Productor 3' },
      { estado: 'Rechazadas', cantidad: 40, temporada: '2023/2024', proceso: 'Post-cosecha', variedad: 'Fuji', productor: 'Productor 1' },
      { estado: 'Retests', cantidad: 20, temporada: '2023/2024', proceso: 'Post-cosecha', variedad: 'Fuji', productor: 'Productor 2' },

      // Temporada 2024/2025
      { estado: 'Pendientes', cantidad: 140, temporada: '2024/2025', proceso: 'Pre-cosecha', variedad: 'Gala', productor: 'Productor 1' },
      { estado: 'Aprobadas', cantidad: 250, temporada: '2024/2025', proceso: 'Pre-cosecha', variedad: 'Gala', productor: 'Productor 1' },
      { estado: 'Rechazadas', cantidad: 120, temporada: '2024/2025', proceso: 'Pre-cosecha', variedad: 'Gala', productor: 'Productor 2' },
      { estado: 'Retests', cantidad: 70, temporada: '2024/2025', proceso: 'Pre-cosecha', variedad: 'Gala', productor: 'Productor 3' },

      { estado: 'Pendientes', cantidad: 100, temporada: '2024/2025', proceso: 'Cosecha', variedad: 'Gala', productor: 'Productor 1' },
      { estado: 'Aprobadas', cantidad: 240, temporada: '2024/2025', proceso: 'Cosecha', variedad: 'Gala', productor: 'Productor 2' },
      { estado: 'Rechazadas', cantidad: 90, temporada: '2024/2025', proceso: 'Cosecha', variedad: 'Gala', productor: 'Productor 3' },
      { estado: 'Retests', cantidad: 70, temporada: '2024/2025', proceso: 'Cosecha', variedad: 'Gala', productor: 'Productor 1' },

      { estado: 'Pendientes', cantidad: 80, temporada: '2024/2025', proceso: 'Post-cosecha', variedad: 'Gala', productor: 'Productor 2' },
      { estado: 'Aprobadas', cantidad: 30, temporada: '2024/2025', proceso: 'Post-cosecha', variedad: 'Gala', productor: 'Productor 3' },
      { estado: 'Rechazadas', cantidad: 50, temporada: '2024/2025', proceso: 'Post-cosecha', variedad: 'Gala', productor: 'Productor 1' },
      { estado: 'Retests', cantidad: 40, temporada: '2024/2025', proceso: 'Post-cosecha', variedad: 'Gala', productor: 'Productor 2' },

      // Otros datos para temporada 2024/2025
      { estado: 'Pendientes', cantidad: 110, temporada: '2024/2025', proceso: 'Pre-cosecha', variedad: 'Pink Lady', productor: 'Productor 1' },
      { estado: 'Aprobadas', cantidad: 220, temporada: '2024/2025', proceso: 'Pre-cosecha', variedad: 'Pink Lady', productor: 'Productor 2' },
      { estado: 'Rechazadas', cantidad: 100, temporada: '2024/2025', proceso: 'Pre-cosecha', variedad: 'Pink Lady', productor: 'Productor 3' },
      { estado: 'Retests', cantidad: 50, temporada: '2024/2025', proceso: 'Pre-cosecha', variedad: 'Pink Lady', productor: 'Productor 1' },

      { estado: 'Pendientes', cantidad: 90, temporada: '2024/2025', proceso: 'Cosecha', variedad: 'Pink Lady', productor: 'Productor 2' },
      { estado: 'Aprobadas', cantidad: 240, temporada: '2024/2025', proceso: 'Cosecha', variedad: 'Pink Lady', productor: 'Productor 3' },
      { estado: 'Rechazadas', cantidad: 95, temporada: '2024/2025', proceso: 'Cosecha', variedad: 'Pink Lady', productor: 'Productor 1' },
      { estado: 'Retests', cantidad: 70, temporada: '2024/2025', proceso: 'Cosecha', variedad: 'Pink Lady', productor: 'Productor 2' },

      { estado: 'Pendientes', cantidad: 70, temporada: '2024/2025', proceso: 'Post-cosecha', variedad: 'Pink Lady', productor: 'Productor 3' },
      { estado: 'Aprobadas', cantidad: 20, temporada: '2024/2025', proceso: 'Post-cosecha', variedad: 'Pink Lady', productor: 'Productor 1' },
      { estado: 'Rechazadas', cantidad: 30, temporada: '2024/2025', proceso: 'Post-cosecha', variedad: 'Pink Lady', productor: 'Productor 2' },
      { estado: 'Retests', cantidad: 15, temporada: '2024/2025', proceso: 'Post-cosecha', variedad: 'Pink Lady', productor: 'Productor 3' },
    ],
  }),

 getters: {
    filteredInspectionData(state) {
      console.log('Filtering with:', {
        season: state.selectedSeason,
        process: state.selectedProcess,
        varieties: state.selectedVarieties,
        producers: state.selectedProducers
      });

      const filtered = state.inspectionData.filter((item) => {
        const matchSeason = !state.selectedSeason || item.temporada === state.selectedSeason;
        const matchProcess = !state.selectedProcess || item.proceso === state.selectedProcess;
        const matchVarieties = state.selectedVarieties.length === 0 || state.selectedVarieties.includes(item.variedad);
        const matchProducers = state.selectedProducers.length === 0 || state.selectedProducers.includes(item.productor);
        
        return matchSeason && matchProcess && matchVarieties && matchProducers;
      });

      console.log('Filtered results:', filtered.length);
      return filtered;
    },
  },

  actions: {
    setSeason(season: string) {
      this.selectedSeason = season;
    },
    setProcess(process: string) {
      this.selectedProcess = process;
    },
    setDates(dates: { start: string; end: string }) {
      this.selectedDates = dates;
    },
    setVarieties(varieties: string[]) {
      this.selectedVarieties = varieties;
    },
    setProducers(producers: string[]) {
      this.selectedProducers = producers;
    },
  },
});
