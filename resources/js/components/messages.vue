<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        chat room <mark>Frinds</mark>
        <button
          class="btn btn-danger btn-sm float-right"
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
export default {
  name: "message",
  //   props: ["chat"],
  data: () => {
    return {
      textmessage: "",
      sender: "sender defualt",
      chat: [],
    };
  },
  methods: {
    send: function () {
      axios
        .post("sendMessage", { text: this.textmessage })
        .then((res) => {
       console.log("res :>> ", res);
        })
        .catch((err) => {
          console.log("err :>>; ", err);
        });

      this.chat.push({ text: this.textmessage, sender: { name: "you" } });
      this.textmessage = "";
      this.$refs.input.focus();
    },
    senderName(sender) {
      return sender.length > 10 ? sender.substr(0, 10) + "..." : sender;
    },
    getChat() {
      axios
        .get("/getMessage")
        .then((res) => {
         //console.log("res :>> ", res);
          this.chat = res.data;
        })
        .catch((err) => {
          console.log("err :>>; ", err);
        });

     this.listen();
    },
    deletALl() {
      axios
        .post("deletAllMessage")
        .then((res) => {
      //    console.log("res :>> ", res);
          this.chat = [];
        })
        .catch((err) => {
          console.log("err :>>; ", err);
        });
    },
    listen : ()=> {
      Echo.private(`sender`).listen("sender", (e) => {
        console.log("enent " , e);
      });


        Echo.join(`sender`)
      .here((users) => {
          console.log(users);
      })
      .joining((user) => {
          console.log(user);
      })
      .leaving((user) => {
          console.log(user);
      })
      .error((error) => {
          console.error(error);
      });
    },
  },
  mounted() {
    this.getChat();
  },
};
</script>
