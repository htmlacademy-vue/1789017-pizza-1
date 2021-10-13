import * as types from "@/store/mutations-types";
import { dough, sizes, sauces, ingredients } from "@/static/pizza.json";
import { capitalize, createUUIDv4 } from "@/common/helpers";
import {
  UPDATE_PIZZA,
  UPDATE_PIZZA_INGREDIENT,
  RESET_PIZZA,
} from "@/store/mutations-types";

const entity = "builder";
const module = capitalize(entity);

const setupPizza = () => ({
  name: "",
  sauce: "",
  dough: "",
  size: "",
  ingredients: [],
});

export default {
  namespaced: true,
  state: {
    sizes: [],
    dough: [],
    sauces: [],
    ingredients: [],
    pizza: setupPizza(),
  },
  actions: {
    async init({ dispatch, commit }) {
      await Promise.all([
        dispatch("fetchDough"),
        dispatch("fetchSizes"),
        dispatch("fetchSauces"),
        dispatch("fetchIngredients"),
      ]);

      // init pizza with default preselected values
      commit(RESET_PIZZA);
    },
    async fetchDough({ commit }) {
      //todo API Call
      commit(
        types.SET_ENTITY,
        {
          module,
          entity: "dough",
          value: dough,
        },
        {
          root: true,
        }
      );
    },
    async fetchSizes({ commit }) {
      //todo API Call
      commit(
        types.SET_ENTITY,
        {
          module,
          entity: "sizes",
          value: sizes,
        },
        {
          root: true,
        }
      );
    },
    async fetchSauces({ commit }) {
      //todo API Call
      commit(
        types.SET_ENTITY,
        {
          module,
          entity: "sauces",
          value: sauces,
        },
        {
          root: true,
        }
      );
    },
    async fetchIngredients({ commit }) {
      //todo API Call
      commit(
        types.SET_ENTITY,
        {
          module,
          entity: "ingredients",
          value: ingredients,
        },
        {
          root: true,
        }
      );
    },
  },
  mutations: {
    [UPDATE_PIZZA](state, pizza) {
      state.pizza = { ...state.pizza, ...pizza };
    },
    [UPDATE_PIZZA_INGREDIENT](state, ingredient) {
      const index = state.pizza.ingredients.findIndex(
        ({ code }) => code === ingredient.code
      );
      if (~index) {
        state.pizza.ingredients.splice(index, 1, ingredient);
      }
    },
    [RESET_PIZZA](state) {
      state.pizza = {
        id: createUUIDv4(),
        name: "",
        dough: state.dough?.[0]?.code,
        size: state.sizes?.[0]?.code,
        sauce: state.sauces?.[0]?.code,
        ingredients: state.ingredients.map((ingredient) => ({
          code: ingredient.code,
          count: 0,
        })),
      };
    },
  },
  getters: {
    price(state) {
      function itemByCode(list = [], code = "") {
        return list.find((item) => item.code === code);
      }

      const doughPrice = itemByCode(state.dough, state.pizza.dough)?.price || 0;
      const saucePrice =
        itemByCode(state.sauces, state.pizza.sauce)?.price || 0;
      const ingredientsPrice = state.pizza.ingredients.reduce(
        (res, ingredient) =>
          res +
            ingredient.count *
              itemByCode(state.ingredients, ingredient.code)?.price || 0,
        0
      );
      const sizeMultiplier =
        itemByCode(state.sizes, state.pizza.size)?.multiplier || 1;

      return (doughPrice + saucePrice + ingredientsPrice) * sizeMultiplier;
    },
  },
};
