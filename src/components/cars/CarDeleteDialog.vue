<template>
  <v-dialog v-model="isOpened" max-width="500px">
    <v-card>
      <v-card-title class="text-h5 center"
        >Esta acción eliminará el auto,<br />
        desea continuar?</v-card-title
      >
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
        <v-btn
          color="blue darken-1"
          text
          :loading="loading"
          @click="confirmDeleteCar"
          >OK</v-btn
        >
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "CarDeleteDialog",

  data: () => ({
    isOpened: false,
    loading: false,
  }),

  computed: {
    ...mapState({
      car: (state) => state.car.car,
    }),
  },

  methods: {
    ...mapActions({
      setCar: "car/setCar",
      deleteCar: "car/deleteCar",
    }),

    open() {
      this.isOpened = true;
    },

    close() {
      this.isOpened = false;
      this.setCar(null);
    },

    async confirmDeleteCar() {
      this.loading = true;
      await this.deleteCar(this.car.id);
      this.loading = false;
      this.close();
    },
  },
};
</script>
