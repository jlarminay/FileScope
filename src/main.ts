import { createApp } from 'vue';
import { Quasar } from 'quasar';

import App from './App.vue';
import router from './lib/router';

import '@quasar/extras/material-symbols-outlined/material-symbols-outlined.css';
import 'quasar/src/css/index.sass';
import './assets/css/tailwind.css';

const app = createApp(App);

app.use(router);
app.use(Quasar, { config: { dark: true } });

app.mount('#app');
