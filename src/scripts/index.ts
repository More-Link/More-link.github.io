import { createApp } from "vue";
import BaseView from "../pages/BaseView.vue";
import '@unocss/reset/normalize.css'
import '../styles/common.css'
import { router } from "./router";

createApp(BaseView).use(router).mount('#app')
