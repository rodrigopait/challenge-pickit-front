<template>
  <v-data-table
    :headers="headers"
    :items="carServices"
    sort-by="marca"
    class="elevation-1"
    :loading="loading"
    show-expand
    item-key="id"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Servicios</v-toolbar-title>
        <v-spacer></v-spacer>
        <car-service-form-dialog
          ref="carServiceFormDialog"
        ></car-service-form-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.carId.userId="{ item: { carId } }">
      {{ carId.userId.name + " " + carId.userId.lastName }}
    </template>
    <template v-slot:item.updatedAt="{ item }">
      <span>{{ new Date(item.updatedAt).toLocaleString() }}</span>
    </template>
    <!-- <template
      v-slot:expanded-item="{ headers }"
      v-slot:item.services.id="{ item }"
    >
      <td :colspan="headers.length">
        {{ item }}
      </td>
    </template> -->
  </v-data-table>
</template>

<script>
import { mapActions, mapState } from "vuex";
import CarServiceFormDialog from "@/components/carServices/CarServiceFormDialog.vue";

export default {
  name: "CarServicesTable",

  components: {
    CarServiceFormDialog,
  },

  data: () => ({
    loading: true,
    headers: [
      {
        text: "Marca",
        align: "start",
        value: "carId.brand",
      },
      { text: "Modelo", value: "carId.model" },
      { text: "Patente", value: "carId.licencePlate" },
      { text: "Año", value: "carId.year" },
      { text: "Dueño", value: "carId.userId" },
      { text: "Color", value: "carId.color" },
      { text: "Precio", value: "price" },
      { text: "Fecha", value: "updatedAt" },
      { text: "Servicios", value: "data-table-expand" },
    ],
  }),

  async created() {
    await this.fetchCarServices();
    this.loading = false;
  },

  computed: {
    ...mapState({
      carServices: (state) => state.carService.carServices,
    }),
  },

  methods: {
    ...mapActions({
      fetchCarServices: "carService/fetchCarServices",
    }),
  },
};
</script>
