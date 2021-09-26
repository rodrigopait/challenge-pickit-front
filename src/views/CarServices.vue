<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('@/assets/logo.svg')"
          class="my-3"
          contain
          height="100"
        />
      </v-col>

      <v-col class="">
        <h1 class="display-2 font-weight-bold mb-3">Servicios</h1>

        <p class="subheading font-weight-regular">
          En esta seccion pude visualizar y administrar todos los servicios de
          sus autos
        </p>
      </v-col>
    </v-row>
    <car-services-table />
  </v-container>
</template>

<script>
import CarServicesTable from "@/components/carServices/CarServicesTable.vue";

export default {
  name: "Users",

  components: {
    CarServicesTable,
  },
};
</script>
