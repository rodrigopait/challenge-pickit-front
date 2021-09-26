import { CarServiceService } from "@/services";

export const initialState = () => ({
  carService: null,
  carServices: [],
});

const state = initialState();

export const mutations = {
  SET_CARSERVICE(state, carService) {
    state.carService = carService;
  },
  SET_CARSERVICES(state, carServices) {
    state.carServices = carServices;
  },
  RESET(state) {
    const newState = initialState();
    Object.keys(newState).forEach((key) => {
      state[key] = newState[key];
    });
  },
};

export const actions = {
  setCarService({ commit }, carService) {
    return commit("SET_CARSERVICE", carService);
  },

  async fetchCarServices({ commit }) {
    try {
      const carServices = await CarServiceService.getAll();
      return commit("SET_CARSERVICES", carServices);
    } catch (error) {
      console.log(error);
    }
  },

  async createCarService({ state, commit }, carServiceData) {
    try {
      const carService = await CarServiceService.save(carServiceData);
      return commit("SET_CARSERVICES", [...state.carServices, carService]);
    } catch (error) {
      console.log(error);
    }
  },
};

export const carService = {
  namespaced: true,
  state,
  actions,
  mutations,
};
