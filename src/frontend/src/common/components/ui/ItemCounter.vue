<template>
  <div class="counter counter--orange ingridients__counter">
    <button
      @click="addValue(-1 * step)"
      type="button"
      :class="[
        'counter__button',
        'counter__button--minus',
        { 'counter__button--disabled': inMinValue },
      ]"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input
      type="text"
      name="counter"
      class="counter__input"
      :value="value"
      @keypress="validateInput"
      @input="setValue($event.target.value)"
    />
    <button
      @click="addValue(step)"
      type="button"
      :class="[
        'counter__button',
        'counter__button--plus',
        { 'counter__button--disabled': inMaxValue },
      ]"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "ItemCounter",
  props: {
    value: {
      type: Number,
      default: 0,
    },
    step: {
      type: Number,
      default: 1,
    },
    min: {
      type: Number,
      default: -Infinity,
    },
    max: {
      type: Number,
      default: +Infinity,
    },
  },
  methods: {
    setValue(value = 0) {
      !value && (value = 0);
      value = parseInt(value);
      value = this.fitLimits(value);
      if (value !== this.value) this.$emit("input", value);
      this.$forceUpdate(); // for case when user enters value greater than max
    },
    fitLimits(value) {
      if (value < this.min) value = this.min;
      if (value > this.max) value = this.max;
      return value;
    },
    validateInput: function (e) {
      const charCode = e.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        e.preventDefault();
      }
    },
    addValue(value = 0) {
      const newValue = this.fitLimits(this.value + value);
      if (newValue !== this.value) this.$emit("input", newValue);
    },
  },
  computed: {
    inMaxValue() {
      return this.max <= this.value;
    },
    inMinValue() {
      return this.value <= this.min;
    },
  },
};
</script>

<style scoped></style>
