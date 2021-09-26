export const initialState = () => ({
  drawerOpened: true,
  error: null,
});

const state = initialState();

export const mutations = {
  TOGGLE_DRAWER_OPENED(state) {
    state.drawerOpened = !state.drawerOpened;
  },
  SET_ERROR(state, payload) {
    state.error = payload;
  },
  RESET(state) {
    const newState = initialState();
    Object.keys(newState).forEach((key) => {
      state[key] = newState[key];
    });
  },
};

export const actions = {
  toggleDrawerOpened({ commit }) {
    return commit("TOGGLE_DRAWER_OPENED");
  },
  setError({ commit }, error) {
    return commit("SET_ERROR", error);
  },
};

export const app = {
  namespaced: true,
  state,
  actions,
  mutations,
};
