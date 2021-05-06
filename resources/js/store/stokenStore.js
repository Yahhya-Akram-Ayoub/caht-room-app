import axios from "axios";

const tokenStore = {
    state: {
        usertoken: ""
    },
    getters: {
        // getToken(state){
        //     return state.usertoken;
        // },
        // getToken2 : (state) => {
        //     return state.usertoken;
        // }
        isLoged(state) {
            return !!state.usertoken;
        }
    },
    mutations: {
        setUserToken(state, userToken) {
            state.usertoken = userToken;
            localStorage.setItem("userToken", userToken);
            axios.defaults.headers.common.Authorization =
                "Bearer " + localStorage.getItem("userToken");
        },
        removeUserToken(state) {
            state.usertoken = null;
            localStorage.removeItem("userToken");
            axios.defaults.headers.common.Authorization = "";
        }
    },
    actions: {
        login({ commit }, payload) {
                axios
                    .post("api/login", payload)
                    .then(res => {
                        commit("setUserToken", res.data.token);
                    })
                    .catch(err => {
                        console.log("err token  :>> ", err);
                        console.log("payload err token  :>> ", payload);
                    });
        },

        register({ commit }, payload) {
            axios
                .post("api/register", payload)
                .then(res => {
                    commit("setUserToken",res.data.token);
                })
                .catch(err => {
                    console.log("err token  :>> ", err);
                    console.log("payload err token  :>> ", payload);
                });
        },

        logout({ commit }) {
            commit("removeUserToken");
        }
    }
};
export default tokenStore;
