<template>
  <v-dialog v-model="isOpened" max-width="700" @click:outside="close">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
        Agregar usuario
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">{{
          !userEditting ? "Agregar usuario" : "Editar usuario"
        }}</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="5">
              <v-text-field v-model="user.name" label="Nombre"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="user.lastName"
                label="Apellido"
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

const getInitialUser = () => ({
  name: "",
  lastName: "",
});

export default {
  name: "UserFormDialog",

  data: () => ({
    isOpened: false,
    loading: false,
    user: getInitialUser(),
  }),

  computed: {
    ...mapState({
      userEditting: (state) => state.user.user,
      users: (state) => state.user.users,
    }),
  },

  methods: {
    ...mapActions({
      createUser: "user/createUser",
      setUser: "user/setUser",
      updateUser: "user/updateUser",
    }),

    open() {
      if (this.userEditting) {
        this.user = { ...this.userEditting };
      }
      this.isOpened = true;
    },

    close() {
      this.isOpened = false;
      this.user = getInitialUser();
      this.setUser(null);
    },

    async save() {
      this.loading = true;
      !this.userEditting
        ? await this.createUser(this.user)
        : await this.updateUser(this.user);
      this.loading = false;
      this.isOpened = false;
    },
  },
};
</script>
