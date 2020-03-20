const JsonApiDataStore = require('jsonapi-datastore');

/**
 * @author toancong1920 <toancong1920@gmail.com>
 * @version: 0.0.1
 * @requires
 *  - jsonapi-datastore for store data follow json api spec
 */

const Lazyload = function Lazyload() {
    return this;
};

Lazyload._lazyload = {}

/**
 * add a callback to resolve later for a unique name
 */
Lazyload.postpone = (name, callback, data) => {
    if (!Lazyload._lazyload[name]) {
    Lazyload._lazyload[name] = {func: null, data: null};
    }
    Lazyload._lazyload[name].func = callback;
    Lazyload._lazyload[name].data = data;
}

Lazyload.load = (name) => {
    Lazyload._lazyload[name].func(Lazyload._lazyload[name].data);
}

Lazyload.storeJsonApi = (payload) => {
    if (!Lazyload._storeJsonApi) {
        Lazyload._storeJsonApi = new JsonApiDataStore.JsonApiDataStore;
    }
    Lazyload._storeJsonApi.sync(payload || []);
    return Lazyload._storeJsonApi;
}

Lazyload.watch = (rootEl, observable, watch) => {
    return new Vue({
        el: '#' + $(`<lazy-load :content="content" id="ll-${String.uuid()}">`).appendTo(rootEl).attr('id'),
        data: {
            data: observable,
            content: null,
        },
        watch,
    });
}

if (!String.uuid) {
    String.uuid = () => {
        var S4 = function() {
           return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        };
        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    }
}

Lazyload.LazyLoadElementVue = require('./LazyLoadElement.vue');

exports = module.exports = Lazyload;
