<template>
  <li class="cart-list__item">
    <div class="product cart-list__product">
      <img
        src="@/assets/img/product.svg"
        class="product__img"
        width="56"
        height="56"
        :alt="pizza.name"
      />
      <div class="product__text">
        <h2>{{ pizza.name }}</h2>
        <ul>
          <li>{{ sizeText }}, на {{ doughText }} тесте</li>
          <li>Соус: {{ sauceText }}</li>
          <li v-if="pizzaIngredients.length">Начинка: {{ ingredientsText }}</li>
        </ul>
      </div>
    </div>

    <ItemCounter
      class="cart-list__counter"
      variant="orange"
      :min="1"
      :value="item.count"
      @input="setPizzaItemCount(item.id, $event)"
    ></ItemCounter>

    <div class="cart-list__price">
      <b>{{ cost }} ₽</b>
    </div>

    <div class="cart-list__button">
      <button type="button" class="cart-list__edit" @click="editPizza">
        Изменить
      </button>
    </div>
  </li>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { itemByCode } from "@/common/helpers";
import { ItemCounter } from "@/common/components/ui";
import { SET_CART_ITEM_COUNT, UPDATE_PIZZA } from "@/store/mutations-types";

export default {
  name: "CartPizzaListItem",
  props: {
    itemId: {
      type: String,
      default: "",
    },
  },
  components: { ItemCounter },

  computed: {
    ...mapState("Cart", ["pizzaItems"]),
    ...mapState("Builder", {
      sizesEnum: "sizes",
      doughEnum: "dough",
      sauceEnum: "sauces",
      ingredientsEnum: "ingredients",
    }),
    item() {
      return this.pizzaItems.find((item) => item.id === this.itemId);
    },
    pizza() {
      return this.item?.pizza;
    },
    pizzaIngredients() {
      return this.pizza.ingredients.filter((ingredient) => ingredient.count);
    },
    sizeText() {
      return itemByCode(this.sizesEnum, this.pizza.size)?.name || "";
    },
    doughText() {
      const map = {
          light: "тонком",
          large: "толстом",
        },
        doughCode = itemByCode(this.doughEnum, this.pizza.dough)?.code || "";

      return map[doughCode];
    },
    sauceText() {
      return (
        itemByCode(this.sauceEnum, this.pizza.sauce)?.name || ""
      ).toLowerCase();
    },
    ingredientsText() {
      const ingredientNames = [];
      this.pizzaIngredients.forEach((ingredient) => {
        const ingredientDetails = itemByCode(
          this.ingredientsEnum,
          ingredient.code
        );
        ingredientNames.push(ingredientDetails.name?.toLowerCase());
      });

      return ingredientNames.join(", ");
    },
    cost() {
      return this.item.price * this.item.count;
    },
  },

  methods: {
    ...mapMutations("Cart", {
      setCartItemCount: SET_CART_ITEM_COUNT,
    }),
    ...mapMutations("Builder", {
      setBuilderPizza: UPDATE_PIZZA,
    }),
    setPizzaItemCount(id = "", count = 1) {
      this.setCartItemCount({
        entity: "pizzaItems",
        id,
        count,
      });
    },
    editPizza() {
      this.setBuilderPizza(this.pizza);
      this.$router.push({ name: "IndexHome" });
    },
  },
};
</script>

<style scoped></style>
