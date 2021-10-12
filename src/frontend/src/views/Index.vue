<template>
  <main class="content">
    <router-view></router-view>
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>
        <BuilderDoughSelector></BuilderDoughSelector>

        <BuilderSizeSelector></BuilderSizeSelector>

        <div class="content__ingridients">
          <div class="sheet">
            <h2 class="title title--small sheet__title">
              Выберите ингридиенты
            </h2>

            <div class="sheet__content ingridients">
              <BuilderSauceSelector></BuilderSauceSelector>

              <BuilderIngredientsSelector></BuilderIngredientsSelector>
            </div>
          </div>
        </div>

        <div class="content__pizza">
          <TextInput
            @input="setPizzaName"
            :value="pizza.name"
            label="Название пиццы"
            placeholder="Введите название пиццы"
          ></TextInput>

          <BuilderPizzaView></BuilderPizzaView>

          <div class="content__result">
            <BuilderPriceCounter></BuilderPriceCounter>

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
import { TextInput, ButtonDefault } from "@/common/components/ui";
import pizzaConstructorData from "@/static/pizza.json";
import BuilderComponents from "@/modules/builder/components";
import { mapMutations, mapState } from "vuex";
import { UPDATE_PIZZA } from "@/store/mutations-types";

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
    };
  },
  methods: {
    ...mapMutations("Builder", {
      updatePizza: UPDATE_PIZZA,
    }),
    setPizzaName(name = "") {
      this.updatePizza({ name });
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

    ...mapState("Builder", {
      pizza: "pizza",
    }),
  },
};
</script>

<style scoped></style>
