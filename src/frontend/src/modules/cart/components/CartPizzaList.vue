<template>
  <ul class="cart-list sheet">
    <CartPizzaListItem
      :itemId="pizzaItem.id"
      v-for="pizzaItem in pizzaItems"
      :key="pizzaItem.id"
    >
    </CartPizzaListItem>
  </ul>
</template>

<script>
import { mapState } from "vuex";
import CartPizzaListItem from "./CartPizzaListItem";

export default {
  name: "CartPizzaList",
  components: { CartPizzaListItem },
  computed: {
    ...mapState("Cart", ["pizzaItems"]),
  },
};
</script>

<style scoped></style>
