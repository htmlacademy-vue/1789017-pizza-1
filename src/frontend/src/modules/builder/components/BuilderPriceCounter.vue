<template>
  <p>Итого: {{ cost }} ₽</p>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "BuilderPriceCounter",
  computed: {
    ...mapState("Builder", {
      pizza: "pizza",
      doughEnum: "dough",
      ingredientsEnum: "ingredients",
      sizeEnum: "sizes",
      saucesEnum: "sauces",
    }),
    doughPrice() {
      return this.itemByCode(this.doughEnum, this.pizza.dough)?.price || 0;
    },

    saucePrice() {
      return this.itemByCode(this.saucesEnum, this.pizza.sauce)?.price || 0;
    },

    ingredientsPrice() {
      return this.pizza.ingredients.reduce(
        (res, ingredient) =>
          res +
            ingredient.count *
              this.itemByCode(this.ingredientsEnum, ingredient.code)?.price ||
          0,
        0
      );
    },

    sizeMultiplier() {
      return this.itemByCode(this.sizeEnum, this.pizza.size)?.multiplier || 1;
    },

    cost() {
      return (
        (this.doughPrice + this.saucePrice + this.ingredientsPrice) *
        this.sizeMultiplier
      );
    },
  },
};
</script>

<style scoped></style>
