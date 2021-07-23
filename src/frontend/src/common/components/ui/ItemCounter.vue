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
      :value="stateValue"
      @keypress="validateInput"
      @input="setStateValue($event.target.value)"
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
  data() {
    return {
      stateValue: 0,
    };
  },
  created() {
    this.setStateValue(this.value);
  },
  methods: {
    setStateValue(value = 0) {
      this.stateValue = value; // for force reactivity redraw
      !value && (value = 0);
      value = value.toString().replace(/[^\d]/g, "");
      value = parseInt(value);
      value = this.fitLimits(value);
      this.stateValue = value;
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
      if (this.valueInLimits(this.stateValue + value)) this.stateValue += value;
    },
    valueInLimits(value) {
      return this.min <= value && value <= this.max;
    },
  },
  computed: {
    inMaxValue() {
      return this.max <= this.stateValue;
    },
    inMinValue() {
      return this.stateValue <= this.min;
    },
  },
  watch: {
    value() {
      this.setStateValue(this.value);
    },
    stateValue(value) {
      this.$emit("input", value);
    },
  },
};
</script>

<style scoped></style>
