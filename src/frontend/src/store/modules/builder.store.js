import * as types from "@/store/mutations-types";
import { dough, sizes, sauces, ingredients } from "@/static/pizza.json";
import { capitalize } from "@/common/helpers";
import { UPDATE_PIZZA } from "@/store/mutations-types";

const entity = "builder";
const module = capitalize(entity);

export default {
  namespaced: true,
  state: {
    sizes: [],
    dough: [],
    sauces: [],
    ingredients: [],
    pizza: {
      sauce: "",
      dough: "",
      size: "",
      ingredients: [],
    },
  },
  actions: {
    async init({ dispatch, commit, state }) {
      await Promise.all([
        dispatch("fetchDough"),
        dispatch("fetchSizes"),
        dispatch("fetchSauces"),
        dispatch("fetchIngredients"),
      ]);

      // init pizza with default preselected values
      commit(UPDATE_PIZZA, {
        dough: state.dough?.[0]?.code,
        size: state.sizes?.[0]?.code,
        sauce: state.sauces?.[0]?.code,
        ingredients: state.ingredients.map((ingredient) => ({
          code: ingredient.code,
          count: 0,
        })),
      });
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
      console.log(`upd `, pizza);
      state.pizza = { ...state.pizza, ...pizza };
      console.log(state.pizza);
    },
  },
};
