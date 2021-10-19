<template>
  <div>
    <form action="test.html" method="post" class="layout-form">
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
          <button type="submit" class="button">Оформить заказ</button>
        </div>
      </section>
    </form>
  </div>
</template>

<script>
import CartComponents from "@/modules/cart/components";
import { mapGetters, mapMutations } from "vuex";
import { RESET_PIZZA } from "@/store/mutations-types";

export default {
  name: "Cart",
  components: {
    ...CartComponents,
  },
  methods: {
    ...mapMutations("Builder", {
      resetBuilder: RESET_PIZZA,
    }),
  },
  computed: {
    ...mapGetters("Cart", {
      totalCost: "cost",
    }),
  },
};
</script>

<style scoped></style>
