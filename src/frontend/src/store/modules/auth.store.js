import * as types from "../mutations-types";
import user from "@/static/user.json";

export default {
  namespaced: true,
  state: {
    user: null,
  },
  actions: {
    async init({ dispatch }) {
      return dispatch("fetchUser");
    },
    async fetchUser({ commit }) {
      // TODO: Add api call
      commit(
        types.SET_ENTITY,
        { module: "Auth", entity: "user", value: user },
        { root: true }
      );
    },
  },
};
