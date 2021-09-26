import { CarService } from "@/services";

export const initialState = () => ({
  car: null,
  cars: [],
});

const state = initialState();

export const mutations = {
  SET_CAR(state, car) {
    state.car = car;
  },
  SET_CARS(state, cars) {
    state.cars = cars;
  },
  RESET(state) {
    const newState = initialState();
    Object.keys(newState).forEach((key) => {
      state[key] = newState[key];
    });
  },
};

export const actions = {
  setCar({ commit }, car) {
    return commit("SET_CAR", car);
  },

  async fetchCars({ commit }) {
    try {
      const cars = await CarService.getAll();
      return commit("SET_CARS", cars);
    } catch (error) {
      console.log(error);
    }
  },

  async createCar({ state, commit }, carData) {
    try {
      const car = await CarService.save(carData);
      commit("SET_CARS", [...state.cars, car]);
      return commit("SET_CAR", null);
    } catch (error) {
      console.log(error);
    }
  },

  async updateCar({ state, commit }, carData) {
    try {
      carData.userId = carData.userId.id;
      const updatedCar = await CarService.update(carData.id, carData);
      const updatedCars = state.cars.map((car) =>
        car.id === updatedCar.id ? updatedCar : car
      );
      commit("SET_CARS", updatedCars);
      return commit("SET_CAR", null);
    } catch (error) {
      console.log(error);
    }
  },

  async deleteCar({ state, commit }, carId) {
    try {
      await CarService.delete(carId);
      const updatedCars = state.cars.filter((car) => car.id !== carId);
      commit("SET_CARS", updatedCars);
      return commit("SET_CAR", null);
    } catch (error) {
      console.log(error);
    }
  },
};

export const car = {
  namespaced: true,
  state,
  actions,
  mutations,
};
