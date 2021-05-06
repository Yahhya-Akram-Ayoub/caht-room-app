<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <div class="d-flex">
          <mark class="mb-1">chat room Frinds</mark>

          <online-users></online-users>
        </div>
        <button
          class="btn btn-danger btn-sm float-xs-left"
          @click.prevent="deletALl"
        >
          delet ALl
        </button>
      </div>
      <ul class="list-group list-group-flush chatroom" v-chat-scroll>
        <li
          class="list-group-item"
          v-for="(message, index) in chat"
          :key="index"
        >
          {{ message.text }}

          <small class="badge badge-success senderName">
            {{ senderName(message.sender.name) }}</small
          >
        </li>
        <span
          class="alert alert-primary m-0 p-0"
          v-for="(message, index) in typingUser"
          :key="index * -1"
        >
          {{ message }} is typing. . .
        </span>
      </ul>
    </div>

    <div class="input-group">
      <input
        v-model="textmessage"
        @keyup.enter="!textmessage.length ? false : send()"
        class="form-control"
        type="text"
        ref="input"
      />
      <div class="input-group-prepend">
        <button
          class="btn btn-success"
          @click="send()"
          :disabled="!textmessage.length"
        >
          <span class="mx-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="16"
              fill="currentColor"
              class="bi bi-cursor"
              viewBox="0 0 16 16"
            >
              <path
                d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103zM2.25 8.184l3.897 1.67a.5.5 0 0 1 .262.263l1.67 3.897L12.743 3.52 2.25 8.184z"
              />
            </svg>
          </span>
        </button>
      </div>
    </div>
  </div>
</template>



<script>
import OnlineUsers from "./OnlineUsers.vue";
export default {
  components: { OnlineUsers },
  name: "message",
  props: ["user"],
  data: () => {
    return {
      textmessage: "",
      sender: "sender defualt",
      typingUser: [],
      chat: [],
    };
  },
  watch: {
    textmessage() {
      Echo.private(`sender`).whisper("typing", {
        name: this.user.name,
        message: !this.textmessage,
      });
    },
  },
  methods: {
    send: function () {
      axios
        .post("api/sendMessage", { text: this.textmessage })
        .then((res) => {
        //   console.log("res :>> ", res);
        })
        .catch((err) => {
          console.log("err :>>; ", err);
        });

      this.textmessage = "";
      this.$refs.input.focus();
    },
    senderName(sender) {
      return sender.length > 10 ? sender.substr(0, 10) + "..." : sender;
    },
    getChat() {
      axios.defaults.headers.common.Authorization =
        "Bearer " + localStorage.getItem("userToken");
        axios
          .get("api/getMessage")
          .then((res) => {
            // console.log("res :>> ", res);
            this.chat = res.data;
          })
          .catch((err) => {
            console.log("err get message :>>; ", err);
          });
      this.listen();
    },
    deletALl() {
      axios
        .post("api/deletAllMessage")
        .then((res) => {
          this.chat = [];
        })
        .catch((err) => {
          console.log("err :>>; ", err);
        });

      Echo.private(`sender`).whisper("deletALlMessage", {
        name: this.user.name,
      });
    },
    listen() {
      Echo.private(`sender`)
        .listen(".sender", (e) => {
          this.chat.push({
            text: e.message.text,
            sender: { name: e.user.name },
          });
        })
        .listenForWhisper("typing", (e) => {
          if (e.message) {
            this.typingUser.splice(this.typingUser.indexOf(e.user), 1);
          } else if (!this.typingUser.includes(e.name)) {
            this.typingUser.push(e.name);
          }
        })
        .listenForWhisper("deletALlMessage", (e) => {
          this.chat = [];
        });
    },
  },
  mounted() {
    this.getChat();
    // console.log(this.user);
  },
};
</script>
