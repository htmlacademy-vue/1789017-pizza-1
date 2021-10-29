<template>
  <li class="additional-list__item sheet">
    <p class="additional-list__description">
      <img
        :src="require(`@/assets/img/${miscItem.code}.svg`)"
        width="39"
        height="60"
        :alt="miscItem.name"
      />
      <span>{{ miscItem.name }}</span>
    </p>

    <div class="additional-list__wrapper">
      <ItemCounter
        class="additional-list__counter"
        variant="orange"
        :min="0"
        :value="cartItem.count"
        @input="setMiscItemCount(cartItem.id, $event)"
      ></ItemCounter>
      <div class="additional-list__price">
        <b>{{ miscItem.price }} ₽</b>
      </div>
    </div>
  </li>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { ItemCounter } from "@/common/components/ui";
import { SET_CART_ITEM_COUNT, UPDATE_PIZZA } from "@/store/mutations-types";

export default {
  name: "CartMiscListItem",
  props: {
    itemId: {
      type: String,
      default: "",
    },
  },
  components: { ItemCounter },

  computed: {
    ...mapState("Cart", ["misc", "miscItems"]),
    miscItem() {
      return this.misc.find((item) => item.code === this.itemId);
    },
    cartItem() {
      return this.miscItems.find((item) => item.id === this.itemId);
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
    setMiscItemCount(id = "", count = 1) {
      this.setCartItemCount({
        entity: "miscItems",
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
