<template>
  <v-navigation-drawer
    id="app-drawer"
    app
    :value="isLargeDevice || drawerOpened"
    @input="handleDrawerChange"
    :mini-variant="isLargeDevice && !drawerOpened"
    mini-variant-width="90"
    dark
    color="rgba(0, 0, 0, 0.55)"
  >
    <v-container class="my-5">
      <v-img
        :src="
          require(isLargeDevice && !drawerOpened
            ? '@/assets/images/logo-mini.png'
            : '@/assets/images/logo.png')
        "
        alt="Logo"
        contain
        :height="isLargeDevice && !drawerOpened ? 40 : 80"
      />
    </v-container>
    <v-divider class="mb-1" />
    <v-list dense nav>
      <v-list-item link to="/">
        <v-list-item-action class="mx-4">
          <v-icon size="28">mdi-car</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title class="text-body-2">Autos</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link to="/users">
        <v-list-item-action class="mx-4">
          <v-icon size="28">mdi-account-group</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title class="text-body-2">Usuarios</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link to="/carServices">
        <v-list-item-action class="mx-4">
          <v-icon size="28">mdi-car-cog</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title class="text-body-2">Servicios</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState({
      drawerOpened: (state) => state.app.drawerOpened,
    }),

    isLargeDevice() {
      return ["lg", "xl"].includes(this.$vuetify.breakpoint.name);
    },
  },

  methods: {
    ...mapActions({
      toggleDrawerOpened: "app/toggleDrawerOpened",
    }),

    handleDrawerChange(newValue) {
      if (this.drawerOpened !== newValue) {
        this.toggleDrawerOpened();
      }
    },
  },
};
</script>
