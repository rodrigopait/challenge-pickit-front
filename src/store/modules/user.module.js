import { UserService } from "@/services";

export const initialState = () => ({
  user: null,
  users: [],
});

const state = initialState();

export const mutations = {
  SET_USER(state, user) {
    state.user = user;
  },
  SET_USERS(state, users) {
    state.users = users;
  },
  RESET(state) {
    const newState = initialState();
    Object.keys(newState).forEach((key) => {
      state[key] = newState[key];
    });
  },
};

export const actions = {
  setUser({ commit }, user) {
    return commit("SET_USER", user);
  },

  async fetchUsers({ commit }) {
    try {
      const users = await UserService.getAll();
      return commit("SET_USERS", users);
    } catch (error) {
      console.log(error);
    }
  },

  async createUser({ state, commit }, userData) {
    try {
      const user = await UserService.save(userData);
      return commit("SET_USERS", [...state.users, user]);
    } catch (error) {
      console.log(error);
    }
  },
};

export const user = {
  namespaced: true,
  state,
  actions,
  mutations,
};
