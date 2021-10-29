<template>
  <div>
    <form action="test.html" method="post" class="layout-form" @submit.prevent>
      <main class="content cart">
        <div class="container">
          <div class="cart__title">
            <h1 class="title title--big">Корзина</h1>
          </div>

          <!-- <div class="sheet cart__empty">
            <p>В корзине нет ни одного товара</p>
          </div> -->

          <CartPizzaList />

          <CartMiscList />

          <CartAddress />
        </div>
      </main>
      <section class="footer">
        <div class="footer__more">
          <router-link
            :to="{ name: 'IndexHome' }"
            class="button button--border button--arrow"
            @click.native="resetBuilder"
            >Хочу еще одну</router-link
          >
        </div>
        <p class="footer__text">
          Перейти к конструктору<br />чтоб собрать ещё одну пиццу
        </p>
        <div class="footer__price">
          <b>Итого: {{ totalCost }} ₽</b>
        </div>

        <div class="footer__submit">
          <button type="submit" class="button" @click="placeOrder">
            Оформить заказ
          </button>
        </div>
      </section>
    </form>
    <CartOrderPlacedPopup
      :show="succOrderPopupShown"
      @close="onSuccOrderPopupClose"
    />
  </div>
</template>

<script>
import CartComponents from "@/modules/cart/components";
import { mapActions, mapGetters, mapMutations } from "vuex";
import { RESET_PIZZA, RESET_CART } from "@/store/mutations-types";

export default {
  name: "Cart",
  components: {
    ...CartComponents,
  },
  data() {
    return {
      succOrderPopupShown: false,
    };
  },
  methods: {
    ...mapMutations("Builder", {
      resetBuilder: RESET_PIZZA,
    }),
    ...mapMutations("Cart", {
      resetCart: RESET_CART,
    }),
    ...mapActions("Orders", ["makeOrder"]),
    async placeOrder() {
      await this.makeOrder();
      this.succOrderPopupShown = true;
    },
    onSuccOrderPopupClose() {
      this.resetCart();
      this.resetBuilder();
      this.succOrderPopupShown = false;
      if (this.authorized)
        this.$router.push({ name: "Orders" }).catch(console.log);
      else this.$router.push({ name: "IndexHome" }).catch(console.log);
    },
  },
  computed: {
    ...mapGetters("Cart", {
      totalCost: "cost",
    }),
    ...mapGetters("Auth", ["authorized"]),
  },
};
</script>

<style scoped></style>
