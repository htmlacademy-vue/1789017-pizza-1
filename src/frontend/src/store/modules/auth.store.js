import * as types from "../mutations-types";
import user from "@/static/user.json";

export default {
  namespaced: true,
  state: {
    user: null,
  },
  actions: {
    async init() {},
    async login({ commit }) {
      // TODO: Add api call
      commit(
        types.SET_ENTITY,
        { module: "Auth", entity: "user", value: user },
        { root: true }
      );
    },
    async logout({ commit }) {
      // TODO: Add api call
      commit(
        types.SET_ENTITY,
        { module: "Auth", entity: "user", value: null },
        { root: true }
      );
    },
  },
  getters: {
    authorized(state) {
      return !!state.user;
    },
    addresses(state) {
      return state.user?.addresses || [];
    },
    phone(state) {
      return state.user?.phone || "";
    },
    addressById(state) {
      return function (id) {
        return state.user.addresses.find((address) => address.id == id);
      };
    },
  },
};
