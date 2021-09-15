import Vue from "vue";
import Vuex from "vuex";
import modules from "@/store/modules";
import mutations from "@/store/mutations";
import actions from "@/store/actions";

Vue.use(Vuex);

const state = () => ({});

export default new Vuex.Store({
  state,
  mutations,
  modules,
  actions,
});
