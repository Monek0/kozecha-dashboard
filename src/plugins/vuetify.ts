import 'vuetify/styles'; // Importa los estilos globales de Vuetify
import { createVuetify } from 'vuetify';
import { aliases, mdi } from 'vuetify/iconsets/mdi';

export default createVuetify({
  icons: {
    defaultSet: 'mdi', // Usa el conjunto de íconos Material Design Icons
    aliases,
    sets: { mdi },
  },
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#1976D2', // Color principal
          secondary: '#424242', // Color secundario
        },
      },
    },
  },
});
