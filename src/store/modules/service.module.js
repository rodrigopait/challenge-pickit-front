import { ServiceService } from "@/services";

export const initialState = () => ({
  services: [],
});

const state = initialState();

export const mutations = {
  SET_SERVICES(state, services) {
    state.services = services;
  },
  RESET(state) {
    const newState = initialState();
    Object.keys(newState).forEach((key) => {
      state[key] = newState[key];
    });
  },
};

export const actions = {
  async fetchServices({ commit }) {
    try {
      const services = await ServiceService.getAll();
      return commit("SET_SERVICES", services);
    } catch (error) {
      console.log(error);
    }
  },
};

export const service = {
  namespaced: true,
  state,
  actions,
  mutations,
};
