<template>
  <header class="header">
    <div class="header__logo">
      <router-link class="logo" :to="{ name: 'IndexHome' }">
        <img
          src="@/assets/img/logo.svg"
          alt="V!U!E! Pizza logo"
          width="90"
          height="40"
        />
      </router-link>
    </div>
    <div class="header__cart">
      <router-link :to="{ name: 'Cart' }">{{ cost }} ₽</router-link>
    </div>
    <div class="header__user">
      <router-link v-if="authorized" :to="{ name: 'Profile' }">
        <picture>
          <source
            type="image/webp"
            srcset="
              @/assets/img/users/user5.webp    1x,
              @/assets/img/users/user5@2x.webp 2x
            "
          />
          <img
            src="img/users/user5.jpg"
            srcset="img/users/user5@2x.jpg"
            :alt="user.name"
            width="32"
            height="32"
          />
        </picture>
        <span>{{ user.name }}</span>
      </router-link>

      <router-link
        v-if="!authorized"
        class="header__login"
        :to="{ name: 'Login' }"
      >
        <span>Войти</span></router-link
      >
      <a v-else href="#" class="header__logout" @click="logout"
        ><span>Выйти</span></a
      >
    </div>
  </header>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";

export default {
  name: "AppLayoutDefaultHeader",
  computed: {
    ...mapState("Auth", ["user"]),
    ...mapGetters("Auth", ["authorized"]),
    ...mapGetters("Cart", ["cost"]),
  },
  methods: {
    ...mapActions("Auth", ["logout"]),
  },
};
</script>

<style scoped lang="scss"></style>
