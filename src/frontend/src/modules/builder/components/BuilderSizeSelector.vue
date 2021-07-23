<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>

      <div class="sheet__content diameter">
        <label
          v-for="size in enumSize"
          :key="size.code"
          :class="`diameter__input diameter__input--${size.code}`"
        >
          <input
            type="radio"
            name="diameter"
            :value="size.code"
            v-model="selectedCode"
            class="visually-hidden"
          />
          <span>{{ size.name }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import { sizes } from "@/static/pizza.json";

export default {
  name: "BuilderSizeSelector",
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
      enumSize: sizes,
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
