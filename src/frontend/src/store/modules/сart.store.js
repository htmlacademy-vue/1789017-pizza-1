import * as types from "@/store/mutations-types";
import misc from "@/static/misc.json";

import {
  SET_CART_ITEM_COUNT,
  SET_CART_ITEM_PIZZA,
  RESET_CART,
  SET_CART_DELIVERY_METHOD,
  SET_CART_PHONE,
  SET_CART_ADDRESS,
  RESET_CART_ADDRESS,
} from "../mutations-types";
import { capitalize } from "@/common/helpers";

const entity = "cart";
const module = capitalize(entity);

const setupCart = () => ({
  misc: [],
  pizzaItems: [],
  miscItems: [],
  delivery: {
    method: "own",
    phone: "",
    address: {
      id: 0,
      name: "",
      street: "",
      building: "",
      flat: "",
      comment: "",
    },
  },
});

export default {
  namespaced: true,
  state: setupCart(),
  actions: {
    async init({ dispatch, commit }) {
      await Promise.all([dispatch("fetchMisc")]);

      // init pizza with default preselected values
      commit(RESET_CART);
    },
    async fetchMisc({ commit }) {
      //todo API Call
      commit(
        types.SET_ENTITY,
        {
          module,
          entity: "misc",
          value: misc,
        },
        {
          root: true,
        }
      );
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
    [SET_CART_DELIVERY_METHOD](state, method) {
      state.delivery.method = method;
    },
    [SET_CART_PHONE](state, phone) {
      state.delivery.phone = phone;
    },
    [SET_CART_ADDRESS](state, address) {
      state.delivery.address = address;
    },
    [RESET_CART_ADDRESS](state) {
      state.delivery.address = setupCart().delivery.address;
    },
    [RESET_CART](state) {
      state.pizzaItems = [];
      state.miscItems = state.misc.map((item) => ({
        id: item.code,
        count: 0,
        price: item.price,
      }));
      state.delivery = setupCart().delivery;
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

    deliveryMethod(state) {
      return state.delivery.method;
    },

    deliveryPhone(state) {
      return state.delivery.phone;
    },
    deliveryAddress(state) {
      return state.delivery.address;
    },
  },
};
