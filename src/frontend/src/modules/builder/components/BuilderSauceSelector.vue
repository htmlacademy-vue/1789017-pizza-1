<template>
  <div class="ingridients__sauce">
    <p>Основной соус:</p>
    <RadioButton
      v-for="sauce in sauces"
      :key="sauce.code"
      :value="sauce.code"
      :label="sauce.name"
      :selected="sauce.code === value"
      name="sauce"
      @click.prevent="$emit('input', sauce.code)"
    ></RadioButton>
  </div>
</template>

<script>
import { sauces } from "@/static/pizza.json";
import { RadioButton } from "@/common/components/ui";

export default {
  name: "BuilderSauceSelector",
  components: { RadioButton },
  data() {
    return {
      sauces,
    };
  },
  props: {
    value: {
      type: String,
      default: () => [],
    },
  },
};
</script>

<style scoped></style>
