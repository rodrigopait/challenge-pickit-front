<template>
  <v-dialog v-model="isOpened" max-width="700" @click:outside="close">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
        Agregar auto
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">{{
          !carEditting ? "Agregar auto" : "Editar auto"
        }}</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="5">
              <v-text-field v-model="car.brand" label="Marca"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field v-model="car.model" label="Modelo"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="3">
              <v-text-field v-model="car.year" label="Año"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="5">
              <v-select
                label="Dueño"
                v-model="car.userId"
                :items="users"
                return-object
              >
                <template v-slot:item="data">
                  {{ data.item.name + " " + data.item.lastName }}
                </template>
                <template v-slot:selection="data">
                  {{ data.item.name + " " + data.item.lastName }}
                </template>
              </v-select>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field v-model="car.color" label="Color"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="3">
              <v-text-field
                v-model="car.licencePlate"
                label="Patente"
              ></v-text-field>
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

const getInitialCar = () => ({
  brand: "",
  model: "",
  year: "",
  licencePlate: "",
  color: "",
  userId: "",
});

export default {
  name: "CarFormDialog",

  data: () => ({
    isOpened: false,
    loading: false,
    car: getInitialCar(),
  }),

  computed: {
    ...mapState({
      carEditting: (state) => state.car.car,
      users: (state) => state.user.users,
    }),
  },

  async created() {
    await this.fetchUsers();
  },

  methods: {
    ...mapActions({
      createCar: "car/createCar",
      setCar: "car/setCar",
      updateCar: "car/updateCar",
      fetchUsers: "user/fetchUsers",
    }),

    open() {
      if (this.carEditting) {
        this.car = { ...this.carEditting };
      }
      this.isOpened = true;
    },

    close() {
      this.isOpened = false;
      this.car = getInitialCar();
      this.setCar(null);
    },

    async save() {
      this.loading = true;
      !this.carEditting
        ? await this.createCar(this.car)
        : await this.updateCar(this.car);
      this.loading = false;
      this.isOpened = false;
    },
  },
};
</script>
