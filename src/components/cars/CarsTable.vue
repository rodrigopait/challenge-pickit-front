<template>
  <v-data-table
    :headers="headers"
    :items="cars"
    sort-by="marca"
    class="elevation-1"
    :loading="loading"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Autos</v-toolbar-title>
        <v-spacer></v-spacer>
        <car-form-dialog ref="carFormDialog"></car-form-dialog>
        <car-delete-dialog ref="carDeleteDialog"></car-delete-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.userId="{ item: { userId } }">
      {{ userId.name + " " + userId.lastName }}
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editCar(item)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteCar(item)"> mdi-delete </v-icon>
    </template>
  </v-data-table>
</template>

<script>
import { mapActions, mapState } from "vuex";
import CarFormDialog from "@/components/cars/CarFormDialog.vue";
import CarDeleteDialog from "@/components/cars/CarDeleteDialog.vue";

export default {
  name: "CarsTable",

  components: {
    CarFormDialog,
    CarDeleteDialog,
  },

  data: () => ({
    loading: true,
    headers: [
      {
        text: "Marca",
        align: "start",
        value: "brand",
      },
      { text: "Modelo", value: "model" },
      { text: "Patente", value: "licencePlate" },
      { text: "Año", value: "year" },
      { text: "Dueño", value: "userId" },
      { text: "Color", value: "color" },
      { text: "Actions", value: "actions", sortable: false },
    ],
  }),

  async created() {
    await this.fetchCars();
    this.loading = false;
  },

  computed: {
    ...mapState({
      cars: (state) => state.car.cars,
    }),
  },

  methods: {
    ...mapActions({
      setCar: "car/setCar",
      fetchCars: "car/fetchCars",
    }),

    editCar(car) {
      this.setCar(car);
      this.$refs.carFormDialog.open();
    },

    deleteCar(car) {
      this.setCar(car);
      this.$refs.carDeleteDialog.open();
    },
  },
};
</script>
