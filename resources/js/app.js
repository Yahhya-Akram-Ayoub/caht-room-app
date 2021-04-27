/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require("./bootstrap");

window.Vue = require("vue").default;

import axios from "axios";
import Vue from "vue";

// for auto scroll
import VueChatScroll from "vue-chat-scroll";
Vue.use(VueChatScroll);

// for notifications
import Toaster from 'v-toaster';
import 'v-toaster/dist/v-toaster.css';
Vue.use(Toaster, {timeout: 5000});


Vue.component(
    "example-component",
    require("./components/ExampleComponent.vue").default
);
Vue.component(
    "message-component",
    require("./components/messages.vue").default
);


const app = new Vue({
    data: {
        chat: [
            {
                text: "message 1 ",
                sender: "sender1 "
            },
            {
                text: "message 2 ",
                sender: "sender2 "
            },
            {
                text: "message 3 ",
                sender: "sender1 "
            },
            {
                text: "message 4 ",
                sender: "sender2 "
            }
        ]
    },
    methods: {
        submit: () => {
            axios
            .post("language", {
                language: document.getElementById("list").value,
            })
            .then(res => {
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
            });
        }
    }
}).$mount("#app");
