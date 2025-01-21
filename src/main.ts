import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import vuetify from './plugins/vuetify.ts';
import { createPinia } from 'pinia';

import 'gridstack/dist/gridstack.min.css';


import '@mdi/font/css/materialdesignicons.css'; // Opcional: íconos de Vuetify

const app = createApp(App);
app.use(createPinia()); // Usa Pinia
app.use(vuetify);
app.mount('#app');


