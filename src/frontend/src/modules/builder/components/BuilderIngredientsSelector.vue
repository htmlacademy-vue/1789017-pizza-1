<template>
  <div class="ingridients__filling">
    <p>Начинка:</p>
    <ul class="ingridients__list">
      <li
        v-for="ingredient in pizzaIngredients"
        :key="ingredient.code"
        class="ingridients__item"
      >
        <AppDrag
          :transferData="{ code: ingredient.code }"
          :active="ingredient.count < MAX_SAME_INGREDIENT_COUNT"
        >
          <span :class="`filling filling--${ingredient.code}`">{{
            ingredientName(ingredient.code)
          }}</span>
        </AppDrag>
        <ItemCounter
          v-model="ingredient.count"
          @input="$emit('input', pizzaIngredients)"
          :min="0"
          :max="MAX_SAME_INGREDIENT_COUNT"
        ></ItemCounter>
      </li>
    </ul>
  </div>
</template>

<script>
import { ingredients } from "@/static/pizza.json";
import { ItemCounter } from "@/common/components/ui";
import { AppDrag } from "@/common/components/behavior";
import { MAX_SAME_INGREDIENT_COUNT } from "@/common/constants";

export default {
  name: "BuilderIngredientsSelector",
  components: { ItemCounter, AppDrag },
  props: {
    value: {
      type: Array,
      default: () => [],
    },
  },
  created() {
    // create local copy to avoid parent state mutation
    this.syncParent();
  },
  data() {
    return {
      ingredients,
      pizzaIngredients: [],
      MAX_SAME_INGREDIENT_COUNT,
    };
  },
  methods: {
    ingredientDetails(code = "") {
      return this.ingredients.find((ingredient) => ingredient.code === code);
    },
    ingredientName(code = "") {
      return this.ingredientDetails(code)?.name;
    },
    syncParent() {
      this.pizzaIngredients = this.value.map((ingredient) => ({
        ...ingredient,
      }));
    },
  },
  watch: {
    value: {
      handler() {
        this.syncParent();
      },
      deep: true,
    },
  },
};
</script>

<style scoped></style>
