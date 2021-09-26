<template>
  <v-data-table
    :headers="headers"
    :items="users"
    sort-by="marca"
    class="elevation-1"
    :loading="loading"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Usuarios</v-toolbar-title>
        <v-spacer></v-spacer>
        <user-form-dialog ref="userFormDialog"></user-form-dialog>
      </v-toolbar>
    </template>
  </v-data-table>
</template>

<script>
import { mapActions, mapState } from "vuex";
import UserFormDialog from "@/components/users/UserFormDialog.vue";

export default {
  name: "UsersTable",

  components: {
    UserFormDialog,
  },

  data: () => ({
    loading: true,
    headers: [
      {
        text: "Nombre",
        align: "start",
        value: "name",
      },
      { text: "Apellido", value: "lastName" },
    ],
  }),

  async created() {
    await this.fetchUsers();
    this.loading = false;
  },

  computed: {
    ...mapState({
      users: (state) => state.user.users,
    }),
  },

  methods: {
    ...mapActions({
      setUser: "user/setUser",
      fetchUsers: "user/fetchUsers",
    }),

    editUser(user) {
      this.setUser(user);
      this.$refs.userFormDialog.open();
    },
  },
};
</script>
