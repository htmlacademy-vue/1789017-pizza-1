<template>
  <div class="ingridients__filling">
    <p>Начинка:</p>
    <ul class="ingridients__list">
      <li
        v-for="ingredient in pizza.ingredients"
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
          class="counter--orange ingridients__counter"
          :value="ingredient.count"
          @input="setPizzaIngredient({ code: ingredient.code, count: $event })"
          :min="0"
          :max="MAX_SAME_INGREDIENT_COUNT"
        ></ItemCounter>
      </li>
    </ul>
  </div>
</template>

<script>
import { ItemCounter } from "@/common/components/ui";
import { AppDrag } from "@/common/components/behavior";
import { MAX_SAME_INGREDIENT_COUNT } from "@/common/constants";
import { mapState, mapMutations } from "vuex";
import { UPDATE_PIZZA, UPDATE_PIZZA_INGREDIENT } from "@/store/mutations-types";

export default {
  name: "BuilderIngredientsSelector",
  components: { ItemCounter, AppDrag },
  data() {
    return {
      MAX_SAME_INGREDIENT_COUNT,
    };
  },
  computed: {
    ...mapState("Builder", {
      enumIngredients: "ingredients",
      pizza: "pizza",
    }),
    selectedSize() {
      return this.pizza?.size;
    },
  },
  methods: {
    ...mapMutations("Builder", {
      setPizzaIngredient: UPDATE_PIZZA_INGREDIENT,
    }),

    ingredientDetails(code = "") {
      return this.enumIngredients.find(
        (ingredient) => ingredient.code === code
      );
    },
    ingredientName(code = "") {
      return this.ingredientDetails(code)?.name;
    },
    ...mapMutations("Builder", {
      updatePizza: UPDATE_PIZZA,
    }),
  },
};
</script>

<style scoped></style>
