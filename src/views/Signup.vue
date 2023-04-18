<template>
  <v-container>
    <v-toolbar rounded color="primary" class="mb-6">
      <v-toolbar-title>Заполните все поля формы регистрации</v-toolbar-title>
    </v-toolbar>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        type="text"
        v-model="name"
        :counter="10"
        :rules="nameRules"
        label="Name"
        required
      ></v-text-field>

      <v-text-field
        type="email"
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        required
      ></v-text-field>

      <v-text-field
        type="password"
        v-model="password"
        :rules="passRules"
        label="Password"
        required
      ></v-text-field>

      <v-checkbox
        v-model="checkbox"
        :rules="checkboxRules"
        label="Подтвердить"
        required
      ></v-checkbox>

      <v-btn
        :disabled="!valid || !checkbox || processing"
        color="success"
        class="mr-4"
        @click.prevent="userStore.SIGNUP(email, password, name)"
      >
        Зарегистрироваться
      </v-btn>

      <v-alert v-if="error" closable class="mt-7" type="warning">{{
        error
      }}</v-alert>
    </v-form>
  </v-container>
</template>

<script setup>
import { computed, ref } from "vue";
import { useUserStore } from "@/store/userStore";
import { useMainStore } from "@/store/mainStore";

const userStore = useUserStore();
const mainStore = useMainStore();

const valid = ref(true);

// CHECKBOX CONFIRMATION
const checkbox = ref(false);
const checkboxRules = [(v) => !!v || "You must agree to continue!"];

// NAME
const name = ref("");
const nameRules = [
  (v) => !!v || "Name is required",
  (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
];

// PASSWORD
const password = ref("");
const passRules = [
  (p) => (p && p.length >= 6) || "Password be more than 5 characters",
];

// EMAIL
const email = ref("");
const emailRules = [
  (v) => !!v || "E-mail is required",
  (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
];

// фикс ошибки
const error = computed(() => mainStore.getError);

// модель для ongoing процесса регистрации
const processing = computed(() => mainStore.getProcessing);
</script>

<style scoped></style>
