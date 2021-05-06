<template>
  <div>

      <div class="form-group row">
        <label for="email" class="col-md-4 col-form-label text-md-right"
          >E-Mail Address</label
        >

        <div class="col-md-6">
          <input
            id="email"
            type="email"
            class="form-control @error('email') is-invalid @enderror"
            name="email"
            required
            autocomplete="email"
            autofocus
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
            class="form-control @error('password') is-invalid @enderror"
            name="password"
            required
            autocomplete="current-password"
            v-model="form.password"
          />
        </div>
      </div>

      <div class="form-group row mb-0">
        <div class="col-md-8 offset-md-4">
          <button type="submit" class="btn btn-primary" @click="Login">
            Login
          </button>
        </div>
      </div>

  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    Login() {
      this.$store.dispatch('login',{email : this.form.email , password : this.form.password} );
    },
  },
};
</script>
