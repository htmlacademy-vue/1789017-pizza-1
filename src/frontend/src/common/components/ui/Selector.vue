<template>
  <select class="select" @change="$emit('input', $event.target.value)">
    <option :value="option.id" v-for="option in options" :key="option.id">
      {{ option.name }}
    </option>
  </select>
</template>

<script>
export default {
  name: "Selector",
  props: {
    value: {
      type: String,
      default: "",
    },
    options: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style scoped></style>
