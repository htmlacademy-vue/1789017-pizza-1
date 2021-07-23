<template>
  <button
    type="button"
    :class="['button', { 'button--disabled': disabled }]"
    :disabled="disabled"
    v-on="$listeners"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "ButtonDefault",
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped></style>
