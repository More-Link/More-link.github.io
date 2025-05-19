import { createApp } from 'vue'
import Nav from './Nav.vue'

const el = document.createElement('link')
el.setAttribute('rel', 'stylesheet')
el.setAttribute('href', 'scripts/nav.css')
document.head.appendChild(el)

createApp(Nav).mount('#nav')
