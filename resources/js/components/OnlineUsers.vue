<template>
  <div class="btn-group ml-auto ">
    <button
      type="button"
      class="btn btn-success btn-sm btn-circle  dropdown-toggle"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
    >
      {{onlineUsers.length}}
      <!-- <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-check"
      >
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg> -->
    </button>
    <div class="dropdown-menu dropdown-menu-right">
      <button
        class="dropdown-item"
        type="button"
        v-for="(user, index) in onlineUsers"
        :key="index"
      >
        {{ user.name }}
      </button>
    </div>
  </div>
</template>

<script>
    export default {
  name: "OnlineUsers",
  data: () => {
    return {
      onlineUsers: [],
    };
  },
  methods: {
    listener() {
      Echo.join(`sender`)
        .here((users) => {
          this.onlineUsers = users;
        //  console.log(this.onlineUsers);
        })
        .joining((user) => {
          this.onlineUsers.push(user);
          this.$toaster.success(user.name + " is join caht room");
        })
        .leaving((user) => {
          this.onlineUsers.splice(this.onlineUsers.indexOf(user), 1);
          this.$toaster.warning(user.name + " is leaving caht room");
        })
        .error((error) => {
          console.error(error);
        });
    },
  },
  mounted() {
    this.listener();
  },
};
</script>
