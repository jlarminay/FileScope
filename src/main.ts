import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { Quasar } from 'quasar';

import App from './App.vue';
import router from './lib/router';

import '@quasar/extras/material-icons/material-icons.css';
import '@quasar/extras/material-symbols-outlined/material-symbols-outlined.css';
import 'quasar/src/css/index.sass';
import './assets/css/tailwind.css';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(Quasar, { config: { dark: false } });

app.mount('#app');
