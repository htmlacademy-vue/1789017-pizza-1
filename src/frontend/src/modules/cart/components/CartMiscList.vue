<template>
  <div class="cart__additional">
    <ul class="additional-list">
      <CartMiscListItem
        :itemId="miscItem.id"
        v-for="miscItem in miscItems"
        :key="miscItem.id"
      >
      </CartMiscListItem>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
import CartMiscListItem from "./CartMiscListItem.vue";

export default {
  name: "CartMiscList",
  computed: {
    ...mapState("Cart", ["miscItems"]),
  },
  components: { CartMiscListItem },
};
</script>

<style scoped></style>
