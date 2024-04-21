export default {
  namespaced: true,
  state: {
    message: null,
    type: "",
  },
  actions: {},
  mutations: {
    setError(state, { message, type }) {
      state.message = message;
      state.type = type;
    },
  },
};
