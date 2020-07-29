window._ = require('lodash');

window.axios = require('axios');

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

window.Vue = require('vue');


Vue.component('test-component', require('./components/TestComponent.vue').default);


const app = new Vue({
    el: '#app'
});
