import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";

import { app } from "./modules/app.module";
import { car } from "./modules/car.module";
import { user } from "./modules/user.module";
import { carService } from "./modules/carService.module";
import { service } from "./modules/service.module";

Vue.use(Vuex);

const modules = {
  app,
  car,
  user,
  carService,
  service,
};

const store = new Vuex.Store({
  modules,
  actions: {
    reset({ commit }) {
      Object.keys(modules).forEach((moduleName) => {
        commit(`${moduleName}/RESET`);
      });
    },
  },
  plugins: [new VuexPersistence().plugin],
});

export default store;
