<template>
  <div class="overlay">
    <div class="sign-form">
      <a href="#" class="close close--white" @click.prevent="$router.back()">
        <span class="visually-hidden">Закрыть форму авторизации</span>
      </a>
      <div class="sign-form__title">
        <h1 class="title title--small">Авторизуйтесь на сайте</h1>
      </div>
      <form action="test.html" method="post">
        <div class="sign-form__input">
          <label class="input">
            <span>E-mail</span>
            <input type="email" name="email" placeholder="example@mail.ru" />
          </label>
        </div>

        <div class="sign-form__input">
          <label class="input">
            <span>Пароль</span>
            <input type="password" name="pass" placeholder="***********" />
          </label>
        </div>
        <button type="submit" class="button" @click.prevent="authorize">
          Авторизоваться
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Login",
  methods: {
    ...mapActions("Auth", ["login"]),
    async authorize() {
      try {
        await this.login();
        this.$router.back();
      } catch (e) {
        //todo some err notification
        console.log(`Error logging in`, e);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.overlay {
  height: 100%;
  width: 100%;
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  background-color: rgb(0, 0, 0); /* Black fallback color */
  background-color: rgba(0, 0, 0, 0.9); /* Black w/opacity */
  overflow-x: hidden; /* Disable horizontal scroll */
  transition: 0.5s; /* 0.5 second transition effect to slide in or slide down the overlay (height or width, depending on reveal) */
}
</style>
