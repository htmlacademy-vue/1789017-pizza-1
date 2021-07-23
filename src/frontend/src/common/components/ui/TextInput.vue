<template>
  <label class="input">
    <span class="visually-hidden">{{ label }}</span>
    <input type="text" :name="name" :placeholder="placeholder" v-model="val" />
  </label>
</template>

<script>
export default {
  name: "TextInput",
  props: {
    value: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
  },
  created() {
    this.val = this.value;
  },
  data() {
    return {
      val: "",
    };
  },
  watch: {
    value(parentValue) {
      this.val = parentValue;
    },
    val(newVal) {
      this.$emit("input", newVal);
    },
  },
};
</script>

<style scoped></style>
