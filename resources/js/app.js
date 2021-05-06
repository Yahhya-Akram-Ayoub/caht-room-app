/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require("./bootstrap");

window.Vue = require("vue").default;

import axios from "axios";
import Vue from "vue";

// fro vues
import Vuex from "vuex";
import tokenStore from "./store/stokenStore";
Vue.use(Vuex);
const store = new Vuex.Store(tokenStore);

// for auto scroll
import VueChatScroll from "vue-chat-scroll";
Vue.use(VueChatScroll);

// for notifications
import Toaster from "v-toaster";
import "v-toaster/dist/v-toaster.css";
Vue.use(Toaster, { timeout: 5000 });

Vue.component("online-users", require("./components/OnlineUsers.vue").default);
Vue.component("Login", require("./components/Login.vue").default);
Vue.component("register", require("./components/register.vue").default);
Vue.component(
    "message-component",
    require("./components/messages.vue").default
);

const app = new Vue({
    data: {},
    methods: {
        logout: () => {
            console.log(' :>>logout');
            store.dispatch('logout');
        },
        submit: () => {
            axios
                .post("language", {
                    language: document.getElementById("list").value
                })
                .then(res => {
                    window.location.reload();
                })
                .catch(err => {
                    console.log(err);
                });
        }
    },
    store,
}).$mount("#app");
