<template>
  <label class="radio ingridients__input">
    <input type="radio" name="sauce" :value="value" :checked="!i" />
    <span>{{ label }}</span>
  </label>
</template>

<script>
export default {
  name: "RadioButton",
  props: {
    value: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped></style>
