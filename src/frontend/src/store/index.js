import Vue from "vue";
import Vuex from "vuex";
import modules from "@/store/modules";

Vue.use(Vuex);

const state = () => ({});

export default new Vuex.Store({
  state,
  modules,
});
