// common app actions
export default {
  async init({ dispatch }) {
    return Promise.all([
      dispatch("Auth/init"),
      dispatch("Builder/init"),
      dispatch("Cart/init"),
    ]);
  },
};
