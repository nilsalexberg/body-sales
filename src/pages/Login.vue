<template>
  <q-page class="wrapper">
    <div class="logo">
      <img class="logo" src="~assets/body.png" />
    </div>

    <form @submit.prevent="login" :disabled="loading">
      <q-input filled v-model="username" label="Usuário">
        <template v-slot:prepend>
          <q-icon name="ion-ios-person" />
        </template>
      </q-input>
      <q-input filled v-model="password" type="password" label="Senha">
        <template v-slot:prepend>
          <q-icon name="ion-ios-lock" />
        </template>
      </q-input>

      <q-btn color="primary" class="full-width" label="Entrar" type="submit" :disabled="loading" />
    </form>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      loading: false
    };
  },
  methods: {
    login() {
      if (this.loading) return;

      this.loading = true;
      this.$store
        .dispatch("login/autenticar", {
          username: this.username,
          password: this.password
        })
        .then(() => {
          this.$router.replace("/inicio");
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>

<style scoped>
.logo {
  padding: 5vh 0;
}
.logo img {
  width: 30vw;
  display: block;
  margin: auto;
  max-width: 200px;
}
.wrapper {
  padding: 5vh;
}
.wrapper > *,
form > * {
  margin-top: 18px;
}
@media (min-width: 769px) {
  .wrapper {
    padding: 5vh 20vw;
  }
}
</style>
