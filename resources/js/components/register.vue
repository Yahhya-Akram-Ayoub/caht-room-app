<template>
  <div>
    <div class="form-group row">
      <label for="name" class="col-md-4 col-form-label text-md-right"
        >Name</label
      >

      <div class="col-md-6">
        <input
          id="name"
          type="text"
          class="form-control"
          name="name"
          autocomplete="name"
          required
          autofocus
          v-model="form.name"
        />
      </div>
    </div>

    <div class="form-group row">
      <label for="email" class="col-md-4 col-form-label text-md-right"
        >E-Mail Address
      </label>

      <div class="col-md-6">
        <input
          id="email"
          type="email"
          class="form-control"
          name="email"
          required
          autocomplete="email"
          v-model="form.email"
        />
      </div>
    </div>

    <div class="form-group row">
      <label for="password" class="col-md-4 col-form-label text-md-right"
        >Password</label
      >

      <div class="col-md-6">
        <input
          id="password"
          type="password"
          class="form-control"
          name="password"
          required
          autocomplete="current-password"
          v-model="form.password"
        />
      </div>
    </div>

    <input
      id="password-confirm"
      type="password"
      class="form-control"
      name="password_confirmation"
      required
      autocomplete="new-password"
      v-model="form.password"
      hidden
    />

    <div class="form-group row mb-0">
      <div class="col-md-8 offset-md-4">
        <button type="submit" class="btn btn-primary" v-on:click="register()">
          register
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "register",
  data() {
    return {
      form: {
        name: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    register() {
      this.$store.dispatch("register", {
        name: this.form.name,
        email: this.form.email,
        password: this.form.password,
      });
    },
  },
};
</script>
