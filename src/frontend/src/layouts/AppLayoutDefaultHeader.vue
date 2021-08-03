<template>
  <header class="header">
    <div class="header__logo">
      <a
        href="#"
        class="logo"
        @click.prevent="$router.push({ name: 'IndexHome' })"
      >
        <img
          src="@/assets/img/logo.svg"
          alt="V!U!E! Pizza logo"
          width="90"
          height="40"
        />
      </a>
    </div>
    <div class="header__cart">
      <a href="cart.html" @click.prevent="$router.push({ name: 'Cart' })"
        >0 ₽</a
      >
    </div>
    <div class="header__user">
      <a
        href="#"
        v-if="authorized"
        @click.prevent="$router.push({ name: 'Profile' })"
      >
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
            alt="Василий Ложкин"
            width="32"
            height="32"
          />
        </picture>
        <span>Василий Ложкин</span>
      </a>
      <a
        v-if="!authorized"
        href="#"
        class="header__login"
        @click.prevent="$router.push({ name: 'Login' })"
        ><span>Войти</span></a
      >
      <a v-else href="#" class="header__logout"><span>Выйти</span></a>
    </div>
  </header>
</template>

<script>
export default {
  name: "AppLayoutDefaultHeader",
  computed: {
    // todo real user authorization detection
    authorized() {
      return ["Cart", "Orders", "Profile"].includes(this.$route.name);
    },
  },
};
</script>

<style scoped lang="scss"></style>
