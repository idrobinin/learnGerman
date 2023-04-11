<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent class="w-50">
      <v-card>
        <v-card-title class="text-h5 text-center">
          Подтвердите выход из аккаунта
        </v-card-title>
        <v-card-actions class="justify-center">
          <v-btn
            class="d-inline-block"
            color="green-darken-1"
            variant="text"
            @click="unConfirmSignOut()"
          >
            Отменить
          </v-btn>
          <v-btn
            class="d-inline-block"
            color="green-darken-1"
            variant="text"
            @click="confirmSignOut()"
          >
            Выйти
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "vue-router";
const userStore = useUserStore();

const router = useRouter();

const dialog = ref(true);
const confirmSignOut = () => {
  userStore.SIGN_OUT();
  dialog.value = false;
  userStore.showSignoutDialog = false;
  userStore.user.isAuthenticated = false;
  router.push({ name: "home" });
};
const unConfirmSignOut = () => {
  dialog.value = false;
  userStore.showSignoutDialog = false;
  userStore.user.isAuthenticated = true;
};
</script>

<style scoped></style>
