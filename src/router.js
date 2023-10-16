import { createRouter, createWebHistory } from 'vue-router';
import Conversion from './views/Conversion.vue'; // Import your components
import Login from './views/IniciarSesion.vue';
import Historial from './views/HistorialConversion.vue';
import Home from './views/Home.vue';

const routes = [
  {
    path: 'NETLIFY_URL_FRONTEND /',
    component: Login,
  },
  {
    path: 'NETLIFY_URL_FRONTEND/home',
    component: Home,
  },
  {
    path: 'NETLIFY_URL_FRONTEND/conversion',
    component: Conversion,
  },
  {
    path: 'NETLIFY_URL_FRONTEND/historialconversion',
    component: Historial,
  },  

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;