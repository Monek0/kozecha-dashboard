<template>
  <div class="grid-stack-item-content kpi-card" ref="kpiCardContainer">
    <v-card
      class="hover:shadow-lg transition-shadow"
      style="width: 100%; height: 100%;"
    >
      <v-card-title class="flex flex-row items-center justify-between space-y-0 pb-2">
        <span class="kpi-title" :style="{ fontSize: titleSize + 'px' }">{{ title }}</span>
        <v-icon :color="color" class="kpi-icon" :style="{ fontSize: iconSize + 'px' }">{{ icon }}</v-icon>
      </v-card-title>
      <v-card-text>
        <div class="kpi-value" :style="{ fontSize: valueSize + 'px' }">{{ value }}</div>
        <p v-if="comparison" class="kpi-status mt-2" :class="trendColor" :style="{ fontSize: statusSize + 'px' }">
          <v-icon :style="{ fontSize: iconSize + 'px' }">{{ trend > 0 ? 'mdi-trending-up' : 'mdi-trending-down' }}</v-icon>
          {{ trend > 0 ? '+' : '' }}{{ trend }}% respecto a 2023/2024
        </p>
        <p v-if="status" class="kpi-status mt-2" :style="{ fontSize: statusSize + 'px' }">{{ status }}</p>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue';
import ResizeObserver from 'resize-observer-polyfill';

export default {
  props: {
    title: String,
    value: String,
    comparison: Boolean,
    trend: Number,
    icon: String,
    color: String,
    status: String,
  },
  setup(props) {
    const kpiCardContainer = ref(null);
    const titleSize = ref(16);
    const iconSize = ref(32);
    const valueSize = ref(24);
    const statusSize = ref(14);
    let resizeObserver = null;

    const trendColor = computed(() => {
      return props.trend > 0
        ? "text-green-500"
        : props.trend < 0
        ? "text-red-500"
        : "text-yellow-500";
    });

    const updateCardSize = () => {
  if (kpiCardContainer.value) {
    const width = kpiCardContainer.value.clientWidth;
    const height = kpiCardContainer.value.clientHeight;

    titleSize.value = width / 15;
    iconSize.value = width / 10;
    valueSize.value = width / 12;
    statusSize.value = width / 18;

    titleSize.value = height / 7;
    iconSize.value = height / 5;
    valueSize.value = height / 6;
    statusSize.value = height / 9;

    // Ajustar el tamaño de los elementos en función de la altura
    const adjustedHeightFactor = height / 100;
    valueSize.value = Math.max(valueSize.value, adjustedHeightFactor * 6);
    statusSize.value = Math.max(statusSize.value, adjustedHeightFactor * 3);

    console.log('KPI redimensionado', width, height);
  }
};

    onMounted(() => {
      nextTick(() => {
        if (kpiCardContainer.value) {
          resizeObserver = new ResizeObserver(() => { updateCardSize(); });
          resizeObserver.observe(kpiCardContainer.value);
          updateCardSize();  // Initial size adjustment
        }
      });
    });

    onBeforeUnmount(() => {
      if (resizeObserver && kpiCardContainer.value) {
        resizeObserver.unobserve(kpiCardContainer.value);
      }
    });

    return {
      kpiCardContainer,
      trendColor,
      titleSize,
      iconSize,
      valueSize,
      statusSize,
      updateCardSize,
    };
  },
};
</script>

<style scoped>
.kpi-card {
  background: linear-gradient(145deg, #ffffff, #f1f1f1); /* Fondo con gradiente */
  border-radius: 16px; /* Esquinas redondeadas */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.06); /* Sombra */
  transition: transform 0.3s ease, box-shadow 0.3s ease; /* Transición suave */
  cursor: grab; /* Indicador visual para mover */
}

.kpi-card:hover {
  transform: translateY(-5px); /* Efecto de "levantar" al hover */
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2), 0 4px 6px rgba(0, 0, 0, 0.1); /* Sombra al hover */
}

.kpi-title {
  font-weight: bold;
}

.kpi-value {
  font-weight: 800;
  color: var(--primary-color); /* Color principal */
}

.kpi-status {
  font-weight: 600;
}

.kpi-icon {
  border-radius: 50%; /* Forma circular */
  background-color: var(--accent-color); /* Fondo del ícono */
  padding: 0.5rem;
}
</style>
