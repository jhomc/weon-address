import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueI18n from 'vue-i18n'

Vue.config.productionTip = false
Vue.use(VueI18n)

const messages = {
  br: {
    message: {
      home: 'Home',
      new: 'Novo',
      newAddress: 'Novo Endereço',
      editAddress: 'Editar Endereço',
      cancel: 'Cancelar',
      save: 'Salvar',
      created_at: 'Criado em',
      updated_at: 'Última atualização',
      company: 'WeON',
      companySubname: 'Address',
      latestRegistries: 'Últimos Registros',
      register: 'Cadastrar Endereço',
      close: 'Fechar'
    }
  },
}

const i18n = new VueI18n({
  locale: 'br', // set locale
  messages, // set locale messages
})

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount('#app')
