<template>
  <v-dialog v-model="isOpened" max-width="1000" @click:outside="close">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
        Agregar servicio
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">{{
          !carServiceEditting ? "Agregar servicio" : "Editar servicio"
        }}</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="5">
              <v-select
                label="Auto"
                v-model="carService.carId"
                :items="cars"
                return-object
              >
                <template v-slot:item="data">
                  {{ data.item.brand + " " + data.item.model }}
                  <span class="text--secondary">
                    {{ "Patente: " + data.item.licencePlate }}
                  </span>
                </template>
                <template v-slot:selection="data">
                  {{ data.item.brand + " " + data.item.model }}
                </template>
              </v-select>
            </v-col>
            <v-col cols="12" sm="6">
              <v-select
                v-model="carService.services"
                :items="services"
                label="Servicios"
                multiple
              >
                <template v-slot:item="data">
                  {{ data.item.name }}
                  <span class="text--secondary">
                    {{ "Precio: " + data.item.price }}
                  </span>
                </template>
                <template v-slot:selection="data">
                  {{ data.item.name }}
                </template>
              </v-select>
            </v-col>
            <v-col cols="12" sm="6" md="3">
              <v-text-field disabled v-model.number="price" label="Precio">
              </v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="close"> Cancelar </v-btn>
        <v-btn color="blue darken-1" :loading="loading" text @click="save">
          Guardar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapState } from "vuex";

const getInitialCarService = () => ({
  carId: "",
  services: [],
  price: "",
});

export default {
  name: "CarServiceFormDialog",

  data: () => ({
    isOpened: false,
    loading: false,
    carService: getInitialCarService(),
    price: 0,
  }),

  computed: {
    ...mapState({
      carServiceEditting: (state) => state.carService.carService,
      cars: (state) => state.car.cars,
      services: (state) => state.service.services,
    }),
  },

  async created() {
    await this.fetchCars();
    await this.fetchService();
  },

  watch: {
    price: "validatePrice",
  },

  methods: {
    ...mapActions({
      setCarService: "carService/setCarService",
      fetchCars: "car/fetchCars",
      fetchService: "service/fetchServices",
    }),

    open() {
      if (this.carServiceEditting) {
        this.carService = { ...this.carServiceEditting };
      }
      this.isOpened = true;
    },

    close() {
      this.isOpened = false;
      this.carService = getInitialCarService();
      this.setCarService(null);
    },

    async save() {
      this.loading = true;
      await this.createCarService(this.carService);
      this.loading = false;
      this.isOpened = false;
    },

    validatePrice() {
      let total = 0;
      this.carService.services.forEach((service) => {
        total += Number(service.price);
      });
      return total;
    },
  },
};
</script>
