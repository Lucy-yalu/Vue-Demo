let config = {
    host: 'http://webhm.top:8899'
}
export default {
    install: function(Vue){
        Vue.prototype.$myconfig = config;
    }
}