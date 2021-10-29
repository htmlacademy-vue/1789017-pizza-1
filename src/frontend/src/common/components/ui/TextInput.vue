<template>
  <label class="input">
    <span class="visually-hidden">{{ label }}</span>
    <input
      :class="{ disabled }"
      type="text"
      :name="name"
      :placeholder="placeholder"
      v-model="val"
      :disabled="disabled"
    />
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
    disabled: {
      type: Boolean,
      default: false,
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

<style scoped lang="scss">
.disabled {
  background-color: lightgray;
}
</style>
