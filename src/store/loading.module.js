export default {
  namespaced: true,
  state: {
    isLoading: false,
  },
  mutations: {
    setLoading(state, { isLoading }) {
      state.isLoading = isLoading;
    },
  },
};
