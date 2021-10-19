import { SET_CART_ITEM_COUNT, SET_CART_ITEM_PIZZA } from "../mutations-types";

export default {
  namespaced: true,
  state: {
    pizzaItems: [],
    miscItems: [],
    delivery: {
      method: "",
      phone: "",
    },
  },
  mutations: {
    [SET_CART_ITEM_PIZZA](state, { entity, id, pizza }) {
      const index = state[entity].findIndex((item) => item.id === id);
      if (~index) {
        const curItem = state[entity][index];
        state[entity].splice(index, 1, { ...curItem, ...{ pizza } });
      }
    },

    [SET_CART_ITEM_COUNT](state, { entity, id, count }) {
      const index = state[entity].findIndex((item) => item.id === id);
      if (~index) {
        const curItem = state[entity][index];
        state[entity].splice(index, 1, { ...curItem, ...{ count } });
      }
    },
  },
  getters: {
    cartPizzaItemById(state) {
      return function (id) {
        return state.pizzaItems.find((pizza) => id === pizza.id);
      };
    },

    cost(state) {
      const pizzaItemsCost = state.pizzaItems.reduce(
        (total, pizzaItem) => total + pizzaItem.price * pizzaItem.count,
        0
      );
      const miscItemsCost = state.miscItems.reduce(
        (total, miscItem) => total + miscItem.price * miscItem.count,
        0
      );
      return pizzaItemsCost + miscItemsCost;
    },
  },
};
