<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>

      <div class="sheet__content dough">
        <label
          v-for="dough in enumDough"
          :key="dough.code"
          :class="`dough__input dough__input--${dough.code}`"
        >
          <input
            type="radio"
            name="dought"
            :value="dough.code"
            v-model="selectedCode"
            class="visually-hidden"
          />
          <b>{{ dough.name }}</b>
          <span>{{ dough.description }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import { dough } from "@/static/pizza.json";

export default {
  name: "BuilderDoughSelector",
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  created() {
    this.selectedCode = this.value;
  },
  data() {
    return {
      selectedCode: "",
      enumDough: dough,
    };
  },
  watch: {
    value() {
      this.selectedCode = this.value;
    },
    selectedCode() {
      this.$emit("input", this.selectedCode);
    },
  },
};
</script>

<style scoped></style>
