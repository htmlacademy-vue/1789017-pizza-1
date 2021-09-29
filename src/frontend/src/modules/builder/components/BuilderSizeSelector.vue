<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>

      <div class="sheet__content diameter">
        <label
          v-for="size in enumSizes"
          :key="size.code"
          :class="`diameter__input diameter__input--${size.code}`"
        >
          <input
            type="radio"
            name="diameter"
            :checked="selectedSize === size.code"
            @click="setPizzaSize(size.code)"
            class="visually-hidden"
          />
          <span>{{ size.name }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import { UPDATE_PIZZA } from "@/store/mutations-types";
import { mapState, mapMutations } from "vuex";

export default {
  name: "BuilderSizeSelector",
  computed: {
    ...mapState("Builder", {
      enumSizes: "sizes",
      pizza: "pizza",
    }),
    selectedSize() {
      return this.pizza?.size;
    },
  },
  methods: {
    ...mapMutations("Builder", {
      updatePizza: UPDATE_PIZZA,
    }),
    setPizzaSize(code) {
      this.updatePizza({ size: code });
    },
  },
};
</script>

<style scoped></style>
