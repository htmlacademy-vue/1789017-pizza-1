<template>
  <label class="radio ingridients__input" v-on="$listeners">
    <input type="radio" :name="name" :value="value" :checked="selected" />
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
    name: {
      type: String,
      required: true,
    },
    selected: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped></style>
