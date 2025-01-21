<template>
  <div class="grid-stack-item-content chart-widget">
    <v-card class="hover:shadow-lg transition-shadow pa-4" style="width: 100%; height: 100%; background-color: white; border-radius: 16px;">
      <div class="d-flex flex-column h-100">
        <div class="d-flex justify-space-between align-center mb-4">
          <h3 class="text-h6">{{ title }}</h3>
        </div>
        <div ref="chartContainer" class="flex-grow-1"></div>
      </div>
    </v-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onBeforeUnmount, ref, nextTick, watch, type PropType } from 'vue';
import * as echarts from 'echarts';
import ResizeObserver from 'resize-observer-polyfill';

export default defineComponent({
  name: 'Chart',
  props: {
    type: {
      type: String as PropType<'pie' | 'bar' | 'line' | 'horizontalBar'>,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    data: {
      type: Object,
      required: true
    },
    options: {
      type: Object,
      default: () => ({}),
    },
    index: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const chartContainer = ref<HTMLElement | null>(null);

    let chartInstance: echarts.ECharts | null = null;
    let resizeObserver: ResizeObserver | null = null;

    const createChartOption = () => {
      const baseOption = {
        title: {
          text: props.title,
          left: 'center',
          top: '5%',
          textStyle: {
            fontSize: '1rem',
            fontWeight: 'bold',
            color: '#333',
          },
        },
        tooltip: {
          trigger: props.type === 'pie' ? 'item' : 'axis',
          axisPointer: {
            type: props.type === 'line' ? 'line' : 'shadow'
          },
          formatter: props.type === 'pie' ? (params: any) => {
            const total = props.data.datasets[0].data.reduce((a: number, b: number) => a + b, 0);
            const percentage = ((params.value / total) * 100).toFixed(1);
            return `${params.name}: ${percentage}% (${params.value})`;
          } : undefined
        },
        legend: {
          bottom: '5%',
          left: 'center',
          textStyle: {
            fontSize: 14,
            color: '#333',
          },
        }
      };

      switch (props.type) {
        case 'pie':
          return {
            ...baseOption,
            series: [{
              type: 'pie',
              radius: '50%',
              data: props.data.labels.map((label: string, index: number) => ({
                name: label,
                value: props.data.datasets[0].data[index]
              })),
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)',
                },
              },
            }]
          };

        case 'bar':
        case 'horizontalBar':
          return {
            ...baseOption,
            xAxis: props.type === 'horizontalBar' ? {
              type: 'value'
            } : {
              type: 'category',
              data: props.data.labels
            },
            yAxis: props.type === 'horizontalBar' ? {
              type: 'category',
              data: props.data.labels
            } : {
              type: 'value'
            },
            series: props.data.datasets.map((dataset: any) => ({
              name: dataset.label,
              type: 'bar',
              data: dataset.data,
              itemStyle: {
                color: dataset.backgroundColor
              },
              stack: props.options?.scales?.x?.stacked ? 'total' : undefined
            }))
          };

        case 'line':
          return {
            ...baseOption,
            xAxis: {
              type: 'category',
              data: props.data.labels,
              boundaryGap: false
            },
            yAxis: {
              type: 'value',
              scale: true
            },
            series: props.data.datasets.map((dataset: any) => ({
              name: dataset.label,
              type: 'line',
              data: dataset.data,
              itemStyle: {
                color: dataset.borderColor
              },
              lineStyle: {
                color: dataset.borderColor
              },
              areaStyle: dataset.fill ? {
                opacity: 0.2
              } : undefined,
              smooth: true
            }))
          };

        default:
          return baseOption;
      }
    };

    const updateChart = () => {
      if (chartInstance) {
        const option = createChartOption();
        chartInstance.setOption(option);
      }
    };

    const resizeChart = () => {
      if (chartInstance && chartContainer.value) {
        chartInstance.resize();
      }
    };

    // Watch for data changes
    watch(() => props.data, () => {
      updateChart();
    }, { deep: true });

    onMounted(() => {
      nextTick(() => {
        if (chartContainer.value) {
          chartInstance = echarts.init(chartContainer.value);
          updateChart();
          
          // Initialize ResizeObserver
          resizeObserver = new ResizeObserver(() => {
            resizeChart();
          });
          resizeObserver.observe(chartContainer.value);
        }
      });
    });

    onBeforeUnmount(() => {
      if (resizeObserver && chartContainer.value) {
        resizeObserver.unobserve(chartContainer.value);
        resizeObserver = null;
      }
      if (chartInstance) {
        chartInstance.dispose();
        chartInstance = null;
      }
    });

    const updateChartSize = () => {
      resizeChart();
    };

    return {
      chartContainer,
      updateChartSize
    };
  },
});
</script>

<style scoped>
.chart-widget {
  background: linear-gradient(145deg, #ffffff, #f1f1f1);
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.06);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: grab;
}

.chart-widget:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2), 0 4px 6px rgba(0, 0, 0, 0.1);
}

.grid-stack-item-content {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.grid-stack-item-content .v-card {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}
</style>
