<template>
  <main class="content">
    <router-view></router-view>
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>
        <BuilderDoughSelector v-model="pizza.dough"></BuilderDoughSelector>

        <BuilderSizeSelector v-model="pizza.size"></BuilderSizeSelector>

        <div class="content__ingridients">
          <div class="sheet">
            <h2 class="title title--small sheet__title">
              Выберите ингридиенты
            </h2>

            <div class="sheet__content ingridients">
              <BuilderSauceSelector
                v-model="pizza.sauce"
              ></BuilderSauceSelector>

              <BuilderIngredientsSelector
                v-model="pizza.ingredients"
              ></BuilderIngredientsSelector>
            </div>
          </div>
        </div>

        <div class="content__pizza">
          <TextInput
            v-model="pizza.name"
            label="Название пиццы"
            placeholder="Введите название пиццы"
          ></TextInput>

          <BuilderPizzaView
            :pizza="pizza"
            @addIngredient="addIngredient($event.code, 1)"
          ></BuilderPizzaView>

          <div class="content__result">
            <BuilderPriceCounter :pizza="pizza"></BuilderPriceCounter>

            <ButtonDefault :disabled="!readyForOrder">
              Готовьте!
            </ButtonDefault>
          </div>
        </div>
      </div>
    </form>
  </main>
</template>

<script>
import { MAX_SAME_INGREDIENT_COUNT } from "@/common/constants";
import { TextInput, ButtonDefault } from "@/common/components/ui";
import pizzaConstructorData from "@/static/pizza.json";
import BuilderComponents from "@/modules/builder/components";

export default {
  name: "Index",
  components: {
    ...BuilderComponents,
    TextInput,
    ButtonDefault,
  },
  data() {
    return {
      constructor: pizzaConstructorData,
      pizza: {
        name: "",
        sauce: pizzaConstructorData.sauces?.[0]?.code || "",
        size: pizzaConstructorData.sizes?.[0]?.code || "",
        dough: pizzaConstructorData.dough?.[0]?.code || "",
        ingredients: pizzaConstructorData.ingredients.map((ingredient) => ({
          code: ingredient.code,
          count: 0,
        })),
      },
    };
  },
  methods: {
    addIngredient(code = "", quantity = 1) {
      if (!code) return;
      const ingredient = this.pizza.ingredients.find(
        (ingredient) => ingredient.code === code
      );
      if (!ingredient) return;
      let newIngredientQuantity = ingredient.count + quantity;
      if (newIngredientQuantity < 0) newIngredientQuantity = 0;
      if (newIngredientQuantity > MAX_SAME_INGREDIENT_COUNT)
        newIngredientQuantity = MAX_SAME_INGREDIENT_COUNT;

      ingredient.count = newIngredientQuantity;
    },
  },
  computed: {
    ingredientSelected() {
      return !!this.pizza.ingredients.find(
        (ingredient) => ingredient.count > 0
      );
    },

    readyForOrder() {
      return this.pizza.name.trim() && this.ingredientSelected;
    },
  },
};
</script>

<style scoped></style>
