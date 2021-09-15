import * as types from "@/store/mutations-types";
import { dough, sizes, sauces, ingredients } from "@/static/pizza.json";

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
    async init({ dispatch }) {
      return Promise.all([
        dispatch("fetchDough"),
        dispatch("fetchSizes"),
        dispatch("fetchSauces"),
        dispatch("fetchIngredients"),
      ]);
    },
    async fetchDough({ commit }) {
      //todo API Call
      commit(
        types.SET_ENTITY,
        {
          module: "Builder",
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
          module: "Builder",
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
          module: "Builder",
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
          module: "Builder",
          entity: "ingredients",
          value: ingredients,
        },
        {
          root: true,
        }
      );
    },
  },
};
