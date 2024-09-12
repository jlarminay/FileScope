import { createMemoryHistory, createRouter } from 'vue-router';

import HomeRoutes from '../modules/home/router';
import ScanningRoutes from '../modules/scanning/router';
import ResultsRoutes from '../modules/results/router';

export default createRouter({
  history: createMemoryHistory(),
  routes: [...HomeRoutes, ...ScanningRoutes, ...ResultsRoutes],
});
