export default {
  namespaced: true,
  state: {
    isLoading: false,
  },
  mutations: {
    setLoading(state, { isLoading }) {
      this.isLoading = isLoading;
    },
  },
};
