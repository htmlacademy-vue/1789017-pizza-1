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
            <p>Итого: {{ pizzaPrice }} ₽</p>
            <ButtonDefault :disabled="!readyForOrder" @click="goCart">
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
import { mapMutations, mapState, mapGetters } from "vuex";
import {
  UPDATE_PIZZA,
  ADD_ENTITY,
  UPDATE_ENTITY,
} from "@/store/mutations-types";

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
    goCart() {
      const cartItem = this.getCartPizzaItem(this.pizza.id);
      const payload = {
        entity: "pizzaItems",
        module: "Cart",
        value: {
          id: this.pizza.id,
          count: 1,
          pizza: this.pizza,
          price: this.pizzaPrice,
        },
      };

      if (cartItem) {
        payload.value = {
          ...cartItem,
          ...{ pizza: this.pizza, price: this.pizzaPrice },
        };
        this.$store.commit(UPDATE_ENTITY, payload, { root: true });
      } else {
        this.$store.commit(ADD_ENTITY, payload, { root: true });
      }

      this.$router.push({ name: "Cart" });
    },
  },
  computed: {
    ...mapGetters("Builder", {
      pizzaPrice: "price",
    }),
    ...mapGetters("Cart", {
      getCartPizzaItem: "cartPizzaItemById",
    }),
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
