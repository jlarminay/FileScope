import { createMemoryHistory, createRouter } from 'vue-router';

import HomeRoutes from '../modules/home/router';
import AboutRoutes from '../modules/about/router';

export default createRouter({
  history: createMemoryHistory(),
  routes: [...HomeRoutes, ...AboutRoutes],
});
