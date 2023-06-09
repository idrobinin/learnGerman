<template>
  <v-container>
    <v-toolbar rounded color="primary" class="mb-6">
      <v-toolbar-title>Заполните все поля для входа</v-toolbar-title>
    </v-toolbar>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        type="email"
        :rules="emailRules"
        v-model="email"
        label="E-mail"
        required
      ></v-text-field>

      <v-text-field
        type="password"
        :rules="passRules"
        v-model="password"
        label="Password"
        required
      ></v-text-field>

      <v-btn
        :disabled="!password || !email || processing === true"
        color="success"
        class="mr-4"
        @click.prevent="signIn"
      >
        Войти
      </v-btn>

      <v-btn color="success" class="mr-4"> Войти через Google </v-btn>

      <v-alert v-if="error" closable class="mt-7" type="warning">{{
        error
      }}</v-alert>
    </v-form>
  </v-container>
</template>

<script setup>
import { computed, ref } from "vue";
import { useMainStore } from "@/store/mainStore";
import { useUserStore } from "@/store/userStore";

const mainStore = useMainStore();
const userStore = useUserStore();

const error = computed(() => mainStore.getError);
const valid = ref(false);

// модель для ongoing процесса регистрации
const processing = computed(() => userStore.SIGNIN_PROCESSING);

const signIn = async () => {
  await userStore.SIGNIN(email.value, password.value);
};

const password = ref("");
const passRules = [
  (p) => (p && p.length >= 6) || "Password be more than 5 characters",
];

const email = ref("");
const emailRules = [
  (v) => !!v || "E-mail is required",
  (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
];
</script>

<style scoped></style>
