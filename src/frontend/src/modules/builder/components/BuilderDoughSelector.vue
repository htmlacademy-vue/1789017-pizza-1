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
            :checked="selectedDough === dough.code"
            @click="setPizzaDough(dough.code)"
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
import { mapState, mapMutations } from "vuex";
import { UPDATE_PIZZA } from "@/store/mutations-types";

export default {
  name: "BuilderDoughSelector",
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      selectedCode: "light",
    };
  },
  computed: {
    ...mapState("Builder", {
      enumDough: "dough",
      pizza: "pizza",
    }),
    selectedDough() {
      return this.pizza?.dough;
    },
  },
  methods: {
    ...mapMutations("Builder", {
      updatePizza: UPDATE_PIZZA,
    }),
    setPizzaDough(code) {
      this.updatePizza({ dough: code });
    },
  },
};
</script>

<style scoped></style>
