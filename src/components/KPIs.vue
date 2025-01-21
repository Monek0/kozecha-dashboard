//KPIs.vue

<template>
  <div class="grid-stack" ref="gridContainer">
    <div v-for="(kpi, index) in kpiData" :key="'kpi-'+index" 
      class="grid-stack-item" 
      :id="'kpi-' + index"
      :gs-w="kpi.width" 
      :gs-h="kpi.height"
      :gs-no-resize="kpi.noResize"
      :gs-no-move= "kpi.noMove"
      >

      <KpiCard
        :title="kpi.title"
        :value="kpi.value"
        :comparison="kpi.comparison"
        :trend="kpi.trend"
        :icon="kpi.icon"
        :color="kpi.color"
        :status="kpi.status"
      />
    </div>

    <!-- Chart Widgets -->
    <div v-for="(chart, index) in chartData" :key="'chart-'+index" 
         class="grid-stack-item" 
         :id="'chart-' + index"
         :gs-w="chart.width" 
         :gs-h="chart.height"
         :gs-no-resize="chart.noResize"
         :gs-no-move= "chart.noMove"
      >
      <div class="grid-stack-item-content">
        <Chart
          :type="chart.type"
          :title="chart.title"
          :data="chart.data"
          :options="chart.options"
          :index="index"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, computed} from 'vue';
import KpiCard from './KPICard.vue';
import { GridStack } from 'gridstack';
import Chart from './Chart.vue';
import layoutData from '../stores/widgetLayout.json';
import { useFiltersStore } from '../stores/filters';

export default defineComponent({
  name: 'KPIs',
  components: {
    KpiCard,
    Chart
  },
  setup() {
    const filtersStore = useFiltersStore();
    
    const role = ref(1);
    const grid = ref(null);

    const kpiData = computed(() => {
      const filteredData = filtersStore.filteredInspectionData;
      const totalInspections = filteredData.reduce((acc, curr) => acc + curr.cantidad, 0);
      const approvedInspections = filteredData
        .filter(item => item.estado === 'Aprobadas')
        .reduce((acc, curr) => acc + curr.cantidad, 0);
      
      // Calcula el porcentaje de aprobación
      const approvalRate = totalInspections > 0 
        ? ((approvedInspections / totalInspections) * 100).toFixed(1)
        : 0;

      // Comparar con la temporada anterior para calcular las tendencias
      const previousSeason = '2023/2024';
      const currentSeason = '2024/2025';
      
      const previousData = filtersStore.inspectionData.filter(item => item.temporada === previousSeason);
      const previousTotal = previousData.reduce((acc, curr) => acc + curr.cantidad, 0);
      
      const trend = previousTotal > 0 
        ? (((totalInspections - previousTotal) / previousTotal) * 100).toFixed(1)
        : 0;


        return[
        {
        id: 1,
        title: 'Total Inspecciones',
        width: 2,  // Ancho del widget en unidades de grid
        height: 1,
        noResize: role.value !== 1,
        noMove: role.value !== 1,
        value: '1,542',
        trend: 12,
        color: '#1976D2',
        icon: 'mdi-account',
        comparison: true
      },
      {
        title: 'Inspecciones Aprobadas',
        width: 2,  // Ancho del widget en unidades de grid
        height: 1,
        noResize: role.value !== 1,
        noMove: role.value !== 1,
        value: '87.5%',
        trend: -2.5,
        color: '#4CAF50',
        icon: 'mdi-account',
        comparison: true
      },
      {
        title: 'Tiempo Promedio',
        width: 2,  // Ancho del widget en unidades de grid
        height: 1,
        noResize: role.value !== 1,
        noMove: role.value !== 1,
        value: '15 min',
        trend: 5,
        color: '#FFC107',
        icon: 'mdi-clock',
        comparison: true
      },
      {
        title: 'Promedio Brix',
        width: 2,  // Ancho del widget en unidades de grid
        height: 1,
        noResize: role.value !== 1,
        noMove: role.value !== 1,
        value: '12.5°',
        color: '#4CAF50',
        icon: 'mdi-thermometer',
        status: 'Excelente'
      },
      {
        title: 'Promedio Firmeza',
        width: 2,  // Ancho del widget en unidades de grid
        height: 1,
        noResize: role.value !== 1,
        noMove: role.value !== 1,
        value: '8.3 kg/cm²',
        color: '#4CAF50',
        icon: 'mdi-account',
        status: 'Excelente'
      },
      
    ];
  });

  const chartData = computed(() => {
      const filteredData = filtersStore.filteredInspectionData;
      
      return [
      {
        type: 'pie',
        title: 'Distribución de Inspecciones',
        width: 3,  // Ancho del widget en unidades de grid
        height: 2, // Alto del widget en unidades de grid
        noResize: role.value !== 1,
        noMove: role.value !== 1,
        data: {
          labels: ['Aprobadas', 'Rechazadas'],
          datasets: [{
            data: [87.5, 12.5],
            backgroundColor: ['#4CAF50', '#FF5252']
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true
        }
      },
      {
        type: 'bar',
        title: 'Inspecciones por Estado',
        width: 3,
        height: 2,
        noResize: role.value !== 1,
        noMove: role.value !== 1,
        data: {
          labels: ['Pendientes', 'Aprobadas', 'Rechazadas', 'Retests'],
          datasets: [{
            data: [10, 50, 15, 25],
            backgroundColor: '#1976D2'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      },
      {
        type: 'bar',
        title: 'Inspecciones por Día y Variedad',
        width: 3,
        height: 2,
        noResize: role.value !== 1,
        noMove: role.value !== 1,
        data: {
          labels: ['Lun', 'Mar', 'Mie', 'Jue', 'Vie'],
          datasets: [
            {
              label: 'Fuji',
              data: [12, 19, 13, 15, 12],
              backgroundColor: '#FF9800'
            },
            {
              label: 'Gala',
              data: [15, 12, 17, 13, 16],
              backgroundColor: '#2196F3'
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: { stacked: true },
            y: { stacked: true }
          }
        }
      },
      {
        type: 'line',
        title: 'Evolución de Atributos por Día',
        width: 3,
        height: 2,
        noResize: role.value !== 1,
        noMove: role.value !== 1,
        data: {
          labels: ['Lun', 'Mar', 'Mie', 'Jue', 'Vie'],
          datasets: [
            {
              label: 'Brix',
              data: [12.5, 12.8, 12.3, 12.9, 12.7],
              borderColor: '#4CAF50',
              fill: false
            },
            {
              label: 'Firmeza',
              data: [8.3, 8.1, 8.4, 8.2, 8.5],
              borderColor: '#2196F3',
              fill: false
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: false
            }
          }
        },
        filters: {
          predio: '',
          cuartel: ''
        }
      },
      {
        type: 'horizontalBar',
        title: 'Defectos por Cuartel',
        width: 3,
        height: 2,
        noResize: role.value !== 1,
        noMove: role.value !== 1,
        data: {
          labels: ['Cuartel 1', 'Cuartel 2', 'Cuartel 3', 'Cuartel 4'],
          datasets: [
            {
              label: 'Manchas',
              data: [15, 12, 8, 10],
              backgroundColor: '#FF9800'
            },
            {
              label: 'Golpes',
              data: [8, 9, 12, 7],
              backgroundColor: '#F44336'
            },
            {
              label: 'Pudrición',
              data: [5, 3, 6, 4],
              backgroundColor: '#9C27B0'
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: { stacked: true },
            y: { stacked: true }
          }
        },
        filters: {
          predio: '',
          cuartel: ''
        }
      },
      {
        type: 'pie',
        title: 'Distribución de Defectos Críticos',
        width: 3,
        height: 2,
        noResize: role.value !== 1,
        noMove: role.value !== 1,
        data: {
          labels: ['Manchas', 'Golpes', 'Pudrición', 'Otros'],
          datasets: [{
            data: [35, 25, 20, 20],
            backgroundColor: ['#FF9800', '#F44336', '#9C27B0', '#607D8B']
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            tooltip: {
              callbacks: {
                label: function(context) {
                  const label = context.label || '';
                  const value = context.parsed || 0;
                  const total = context.dataset.data.reduce((a, b) => a + b, 0);
                  const percentage = ((value * 100) / total).toFixed(1);
                  return `${label}: ${percentage}% (${value})`;
                }
              }
            }
          }
        }
      },
    ]});

    onMounted(() => {
      grid.value = GridStack.init({
        float: true,
        animate: true,
        column: 12,
        //cellHeight: 150
      });

      layoutData.forEach(widget => {
        const el = document.getElementById(widget.id);
        if (el) {
          grid.value.update(el, {
            id: widget.id,
            x: widget.x,
            y: widget.y,
            w: widget.width,
            h: widget.height,
          });
        }
      });

      // Captura cambios en el layout
      grid.value.on('change', (event, items) => {
        const updatedLayout = items.map(item => ({
          id: item.id,
          x: item.x,
          y: item.y,
          width: item.w,
          height: item.h
        }));

        // Simula guardar en el archivo JSON (en producción sería una API)
        console.log('Layout actualizado:', JSON.stringify(updatedLayout, null, 2));
      });

      // Bloque para actualizar widgets y propiedades
      grid.value.engine.nodes.forEach((node, index) => {
        if (kpiData.value[index]?.resize === false) {
          grid.value.update(node.el, {
            noResize: true,
            disableDrag: true,
          });
        }
      });

      grid.value.on('resizestop', (event, el) => {
        const kpiComponent = el.querySelector('.grid-stack-item-content').__vue__;
        if (kpiComponent && typeof kpiComponent.updateCardSize === 'function') {
          kpiComponent.updateCardSize(); // Llama a la función updateCardSize si existe
        }

        const chartComponent = el.querySelector('.grid-stack-item-content').__vue__;
        if (chartComponent && typeof chartComponent.updateChartSize === 'function') {
          chartComponent.updateChartSize(); // Llama a la función updateChartSize si existe
        }
      });
    });

    return {
      kpiData,
      chartData
    };
  }
});
</script>

<style>
.grid-stack {
  width: 100%;
  max-width: 100%; /* Evita que los elementos se desborden hacia la derecha */
  overflow-x: hidden; /* Evita el desplazamiento horizontal */
}
.grid-stack-item {
  max-width: 100%; /* Asegura que los items no se salgan de la pantalla */
}


</style>