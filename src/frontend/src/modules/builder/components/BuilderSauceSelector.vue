<template>
  <div class="ingridients__sauce">
    <p>Основной соус:</p>
    <RadioButton
      v-for="sauce in enumSauces"
      :key="sauce.code"
      :value="sauce.code"
      :label="sauce.name"
      :selected="sauce.code === selectedSauce"
      name="sauce"
      @click.prevent="setPizzaSauce(sauce.code)"
    ></RadioButton>
  </div>
</template>

<script>
import { UPDATE_PIZZA } from "@/store/mutations-types";
import { RadioButton } from "@/common/components/ui";
import { mapState, mapMutations } from "vuex";

export default {
  name: "BuilderSauceSelector",
  components: { RadioButton },
  computed: {
    ...mapState("Builder", {
      enumSauces: "sauces",
      pizza: "pizza",
    }),
    selectedSauce() {
      return this.pizza?.sauce;
    },
  },
  methods: {
    ...mapMutations("Builder", {
      updatePizza: UPDATE_PIZZA,
    }),
    setPizzaSauce(code) {
      this.updatePizza({ sauce: code });
    },
  },
};
</script>

<style scoped></style>
