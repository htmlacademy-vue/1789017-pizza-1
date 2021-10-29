<template>
  <div class="popup" v-if="show">
    <a href="#" class="close" @click.prevent="$emit('close')">
      <span class="visually-hidden">Закрыть попап</span>
    </a>
    <div class="popup__title">
      <h2 class="title">Спасибо за заказ</h2>
    </div>
    <p>Мы начали готовить Ваш заказ, скоро привезём его вам ;)</p>
    <div class="popup__button">
      <a href="#" class="button" @click.prevent="$emit('close')"
        >Отлично, я жду!</a
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "CartOrderPlacedPopup",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped></style>
