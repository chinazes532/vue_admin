import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')

// Примерно в main.js
if (window.Telegram?.WebApp) {
    window.Telegram.WebApp.ready();  // Сообщаем, что WebApp готов
    window.Telegram.WebApp.expand(); // Делаем окно по всей высоте
}